// tenant.service.ts
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { AWSService } from './aws.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
@ApiTags('Tenant Management')
export class TenantService {
  constructor(private readonly awsService: AWSService) {}

  /**
   * Create a tenant secret.
   * @param AWS_ACCESS_KEY_ID - The AWS access key ID.
   * @param AWS_SECRET_ACCESS_KEY - The AWS secret access key.
   * @param IAM_ROLE_ARN - The AWS IAM role ARN (not used directly here, but maybe necessary for other AWS actions).
   * @param TENANT_NAME - Tenant Name
   * @param TENANT_DETAILS - Details of the tenant for whom to create a secret.
   */
  @ApiOperation({ summary: 'Create Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret created successfully' })
  async createTenantSecret(
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    IAM_ROLE_ARN: string,
    TENANT_NAME: string,
    TENANT_DETAILS: any
  ): Promise<string> {
      try {
        if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !IAM_ROLE_ARN || !TENANT_DETAILS) {
        throw new HttpException('All input parameters are required.', HttpStatus.BAD_REQUEST);
      }

       // Create temporary AWS access keys to open tekk secret.
       const temporaryAccessKeysTekk = await this.awsService.createTemporaryAccessKeys(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN  
      );
      console.log('temporaryAccessKeysTekk >> ', temporaryAccessKeysTekk);

      // Get Tekk Secret
      const TekkSecret = await this.awsService.getSecretCredentials(
        process.env.TEKK_SECRET_NAME, 
        temporaryAccessKeysTekk.AccessKeyId,
        temporaryAccessKeysTekk.SecretAccessKey,
        temporaryAccessKeysTekk.SessionToken      
      );

      console.log('TekkSecret >> ', TekkSecret);

      // Create temporary AWS access keys to open assyst secret.
      const temporaryAccessKeysAssyst = await this.awsService.createTemporaryAccessKeys(
        TekkSecret.assyst_cloud_access_key_id || '',
        TekkSecret.assyst_cloud_secret_access_key || '',
        TekkSecret.assyst_cloud_arn || '' 
      );
      console.log('temporaryAccessKeysAssyst >> ', temporaryAccessKeysAssyst);

      // Get Assyst Secret
      const existingAssystSecret = await this.awsService.getSecretCredentials(
        process.env.ASSYST_SECRET_NAME, 
        temporaryAccessKeysAssyst.AccessKeyId,
        temporaryAccessKeysAssyst.SecretAccessKey,
        temporaryAccessKeysAssyst.SessionToken      
      );
      console.log('existingAssystSecret >> ', existingAssystSecret);

      // Create temporary AWS access keys to create tenanat using assyst credentials.
      const temporaryAccessKeysTenant = await this.awsService.createTemporaryAccessKeys(
        existingAssystSecret.AWS_ACCESS_KEY_ID || '',
        existingAssystSecret.AWS_SECRET_ACCESS_KEY || '',
        existingAssystSecret.IAM_ROLE_ARN || ''  
      );

      console.log('temporaryAccessKeysTenant >> ', temporaryAccessKeysTenant);
      console.log('tenant name >> ', TENANT_NAME);

      const IAMuserName = `tenant-${TENANT_NAME}`;
      const roleName = `TenantRole-${TENANT_NAME}`;
      const ploicyName = `TenantPolicy-${TENANT_NAME}`;

      // Use the credentials to create IAM user for the tenant
      const {iamUserArn, iamRoleArn, error} = await this.awsService.createIAMUser(IAMuserName, temporaryAccessKeysTenant, roleName, ploicyName);
      if (error) {
        console.error('Error occurred >> ', error.message);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } 

      console.log('iamUserArn >> ', iamUserArn);

      // Create permanent access keys for the IAM user
      const userAccessKeys = await this.awsService.createAccessKeyForUser(IAMuserName, temporaryAccessKeysTenant);
      console.log('User Access Keys >> ', userAccessKeys);

      // Assuming existingAssystSecret is the parsed JSON object of the current secret's value
      let updatedAssystSecret;

      if (existingAssystSecret && existingAssystSecret.tenants) {
          // If the 'tenants' key already exists, add the new tenant to it
          updatedAssystSecret = {
              ...existingAssystSecret,
              tenants: {
                  ...existingAssystSecret.tenants,
                  [TENANT_NAME]: {
                      AccessKeyId: userAccessKeys.AccessKeyId,
                      SecretAccessKey: userAccessKeys.SecretAccessKey,
                      RoleArn: iamRoleArn
                  }
              }
          };
      } else {
          // If the 'tenants' key does not exist, create it and add the new tenant
          updatedAssystSecret = {
              ...existingAssystSecret,
              tenants: {
                  [TENANT_NAME]: {
                      AccessKeyId: userAccessKeys.AccessKeyId,
                      SecretAccessKey: userAccessKeys.SecretAccessKey,
                      RoleArn: iamRoleArn
                  }
              }
          };
      }

      // Update the secret in AWS Secrets Manager
      await this.awsService.updateSecret(process.env.ASSYST_SECRET_NAME, JSON.stringify(updatedAssystSecret), temporaryAccessKeysAssyst);

      // Introduce a delay
      const delay = 10000; // Delay of 10000 milliseconds (10 seconds)
      await new Promise(resolve => setTimeout(resolve, delay));

      // Create temporary AWS access keys to create tenant secret.
      const temporaryAccessKeys1 = await this.awsService.createTemporaryAccessKeys(
        userAccessKeys.AccessKeyId || '',
        userAccessKeys.SecretAccessKey || '',
        iamRoleArn || ''  
      );

      console.log('temporaryAccessKeys1 >> ', temporaryAccessKeys1);

      const newUserCredentials = {
          AccessKeyId: temporaryAccessKeys1.AccessKeyId || '',
          SecretAccessKey: temporaryAccessKeys1.SecretAccessKey || '',
          sessionToken: temporaryAccessKeys1.SessionToken || ''
      };

      const tenantSecretName = `${IAMuserName}-secret`;
      
      console.log('tenantSecretName >> ', tenantSecretName);

      await this.awsService.createSecretWithCredentials(
        tenantSecretName,
        JSON.stringify(TENANT_DETAILS),
        newUserCredentials
      );

      console.log('Secret Created Successfully');

      return 'Secret Created Successfully';

    } catch (error) {
      console.error('Error creating tenant secret:', error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  /**
   * Get the tenant secret.
   * @param AWS_ACCESS_KEY_ID - The AWS access key ID.
   * @param AWS_SECRET_ACCESS_KEY - The AWS secret access key.
   * @param IAM_ROLE_ARN - The AWS IAM role ARN (not used directly here, but maybe necessary for other AWS actions).
   * @param TENANT_NAME - Tenant Name
   */
  @ApiOperation({ summary: 'Get Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret retrieved successfully' })
  @ApiTags('Tenant Management')
  async getTenantSecret(
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    IAM_ROLE_ARN: string,
    TENANT_NAME: string
  ): Promise<string> {
    try {
      if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !IAM_ROLE_ARN || !TENANT_NAME) {
        throw new HttpException('All input parameters are required.', HttpStatus.BAD_REQUEST);
      }     

      // Create temporary AWS access keys to open tekk secret.
      const temporaryAccessKeysTekk = await this.awsService.createTemporaryAccessKeys(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN  
      );
      console.log('temporaryAccessKeysTekk >> ', temporaryAccessKeysTekk);

      // Get Tekk Secret
      const TekkSecret = await this.awsService.getSecretCredentials(
        process.env.TEKK_SECRET_NAME, 
        temporaryAccessKeysTekk.AccessKeyId,
        temporaryAccessKeysTekk.SecretAccessKey,
        temporaryAccessKeysTekk.SessionToken      
      );

      console.log('TekkSecret >> ', TekkSecret);

      // Create temporary AWS access keys to open assyst secret.
      const temporaryAccessKeys = await this.awsService.createTemporaryAccessKeys(
        TekkSecret.assyst_cloud_access_key_id || '',
        TekkSecret.assyst_cloud_secret_access_key || '',
        TekkSecret.assyst_cloud_arn || '' 
      );

      console.log('temporaryAccessKeys >> ', temporaryAccessKeys);

      // Get Assyst Secret
      const assystSecretResponse = await this.awsService.getSecretCredentials(
        process.env.ASSYST_SECRET_NAME, 
        temporaryAccessKeys.AccessKeyId,
        temporaryAccessKeys.SecretAccessKey,
        temporaryAccessKeys.SessionToken      
      );

      // Access the tenants object
      const assystSecret = assystSecretResponse.tenants;

      // Get specific tenant details
      const tenantDetails = assystSecret[TENANT_NAME]; 
      
      if (tenantDetails == undefined) {
        throw new HttpException('Tenant details not found', HttpStatus.BAD_REQUEST);
      }

      // reate temporary AWS access keys using the tenant credentials
      const temporaryAccessKeysTenant = await this.awsService.createTemporaryAccessKeys(
        tenantDetails.AccessKeyId || '',
        tenantDetails.SecretAccessKey || '',
        tenantDetails.RoleArn || ''  
      );

      const newUserCredentials = {
          AccessKeyId: temporaryAccessKeysTenant.AccessKeyId || '',
          SecretAccessKey: temporaryAccessKeysTenant.SecretAccessKey || '',
          SessionToken: temporaryAccessKeysTenant.SessionToken || ''
      };

      // Get tenant secret 
      const tenantSecretValue = await this.awsService.getSecretValue(
        newUserCredentials,
        `tenant-${TENANT_NAME}-secret`
      );

      return tenantSecretValue;

    } catch (error) {
      console.error('Error getting tenant secret:', error);

      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update the tenant secret.
   * @param AWS_ACCESS_KEY_ID - The AWS access key ID.
   * @param AWS_SECRET_ACCESS_KEY - The AWS secret access key.
   * @param IAM_ROLE_ARN - The AWS IAM role ARN (not used directly here, but maybe necessary for other AWS actions).
   * @param TENANT_NAME - Tenant Name
   * @param TENANT_DETAILS - Details of the tenant for whom to create a secret.
   */
  @ApiOperation({ summary: 'Update Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret updated successfully' })
  async updateTenantSecret(
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    IAM_ROLE_ARN: string,
    TENANT_NAME: string,
    TENANT_DETAILS: any
  ): Promise<string> {
    try {
      if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !IAM_ROLE_ARN || !TENANT_NAME) {
        throw new HttpException('All input parameters are required.', HttpStatus.BAD_REQUEST);
      }     

      // Create temporary AWS access keys to open tekk secret.
      const temporaryAccessKeysTekk = await this.awsService.createTemporaryAccessKeys(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN  
      );
      console.log('temporaryAccessKeysTekk >> ', temporaryAccessKeysTekk);

      // Get Tekk Secret
      const TekkSecret = await this.awsService.getSecretCredentials(
        process.env.TEKK_SECRET_NAME, 
        temporaryAccessKeysTekk.AccessKeyId,
        temporaryAccessKeysTekk.SecretAccessKey,
        temporaryAccessKeysTekk.SessionToken      
      );

      console.log('TekkSecret >> ', TekkSecret);

      // Create temporary AWS access keys to open assyst secret.
      const temporaryAccessKeys = await this.awsService.createTemporaryAccessKeys(
        TekkSecret.assyst_cloud_access_key_id || '',
        TekkSecret.assyst_cloud_secret_access_key || '',
        TekkSecret.assyst_cloud_arn || '' 
      );

      // Get Assyst Secret
      const assystSecretResponse = await this.awsService.getSecretCredentials(
        process.env.ASSYST_SECRET_NAME, 
        temporaryAccessKeys.AccessKeyId,
        temporaryAccessKeys.SecretAccessKey,
        temporaryAccessKeys.SessionToken      
      );

      // Access the tenants object
      const assystSecret = assystSecretResponse.tenants;

      // Get specific tenant details
      const tenantDetails = assystSecret[TENANT_NAME]; 
      
      if (tenantDetails == undefined) {
        throw new HttpException('Tenant details not found', HttpStatus.BAD_REQUEST);
      }

      // reate temporary AWS access keys using the tenant credentials
      const temporaryAccessKeys2 = await this.awsService.createTemporaryAccessKeys(
        tenantDetails.AccessKeyId || '',
        tenantDetails.SecretAccessKey || '',
        tenantDetails.RoleArn || ''  
      );

      const secretCredentials = {
          AccessKeyId: temporaryAccessKeys2.AccessKeyId || '',
          SecretAccessKey: temporaryAccessKeys2.SecretAccessKey || '',
          SessionToken: temporaryAccessKeys2.SessionToken || ''
      };

      // Get tenant secret 
      const tenantSecretValue = await this.awsService.getSecretValue(
        secretCredentials,
        `tenant-${TENANT_NAME}-secret`
      );

      console.log('tenantSecretValue >> ', tenantSecretValue)

      // Update the secret in AWS Secrets Manager
      await this.awsService.updateSecret(`tenant-${TENANT_NAME}-secret`, JSON.stringify(TENANT_DETAILS), secretCredentials);

      console.log('Secret Updated Successfully');

      return 'Secret Updated Successfully';


    } catch (error) {
      console.error('Error getting tenant secret:', error);

      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
