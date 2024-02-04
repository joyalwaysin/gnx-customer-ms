// aws.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { SecretsManager, STS, IAM } from 'aws-sdk';

@Injectable()
export class AWSService {
  private secretsManager: SecretsManager;
  private sts: STS;
  private iam: IAM;

  constructor() {
    this.secretsManager = new SecretsManager();
    this.sts = new STS();
    this.iam = new IAM();
  }

  /**
   * Create a namespace in Secrets Manager.
   * @param namespace - The namespace to create.
   * @throws BadRequestException if namespace is falsy.
   */
  async createNamespace(namespace: string): Promise<void> {
    if (!namespace) {
      throw new BadRequestException('Namespace is required.');
    }

    const createNamespaceParams = {
      Name: namespace,
    };
    await this.secretsManager.createSecret(createNamespaceParams).promise();
  }

  /**
   * Create a secret in Secrets Manager.
   * @param namespace - The namespace for the secret.
   * @param secretName - The name of the secret.
   * @param secretValue - The value of the secret.
   * @throws BadRequestException if namespace, secretName, or secretValue is falsy.
   */
  async createSecret(namespace: string, secretName: string, secretValue: string): Promise<void> {
    if (!namespace || !secretName || !secretValue) {
      throw new BadRequestException('Namespace, secretName, and secretValue are required.');
    }

    const createSecretParams = {
      Name: `${namespace}/${secretName}`,
      SecretString: secretValue,
    };
    await this.secretsManager.createSecret(createSecretParams).promise();
  }
  
  /**
   * Create temporary AWS access keys.
   * @param accessKeyId - The AWS access key ID.
   * @param secretAccessKey - The AWS secret access key.
   * @param roleArn - The AWS arn role.
   * @returns Assyst credentials.
   */
  async createTemporaryAccessKeys(accessKeyId: string, secretAccessKey: string, roleArn: string): Promise<any> {
    // Instantiate STS with the long-term credentials
    const sts = new STS({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    // Assume the role using STS to get temporary credentials
    const assumedRole = await sts.assumeRole({
      RoleArn: roleArn,
      RoleSessionName: `AssystSession-${new Date().getTime()}` // Unique session name
    }).promise();

    // Set response
    const credentials = {
      AccessKeyId: assumedRole.Credentials.AccessKeyId || '',
      SecretAccessKey: assumedRole.Credentials.SecretAccessKey || '', 
      SessionToken: assumedRole.Credentials.SessionToken || '', 
    };

    return credentials;
  }

  /**
   * Get Secret credentials from Secrets Manager using provided credentials.
   * @param assystSecretName - The name of the Assyst secret.
   * @param accessKeyId - The AWS access key ID.
   * @param secretAccessKey - The AWS secret access key.
   * @param sessionToken - The AWS session token.
   * @returns Secret credentials.
   */
  async getSecretCredentials(secretName: string, accessKeyId: string, secretAccessKey: string, sessionToken: string): Promise<any> {
    try {
      // Make sure secretName has a value
      if (!secretName) {
        throw new Error('SecretName is required but was not provided.');
      }
  
      this.secretsManager = new SecretsManager({
        region: 'us-east-1',
        credentials: {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        },
      });
  
      const result = await this.secretsManager.getSecretValue({ SecretId: secretName }).promise();
      return JSON.parse(result.SecretString || '{}');
    } catch (error) {
      console.error('Error getting secret credentials:', error);
      throw error; 
    }
  }

  /**
   * Get the value of a secret in Secrets Manager.
   * @param secretName - The name of the secret.
   * @returns The secret's value.
   */
  async getSecretValue(credentials: any, secretName: string): Promise<any> {
    // Instantiate SecretsManager with provided credentials
    this.secretsManager = new SecretsManager({
      region: 'us-east-1',  
      credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken,
      },
    });

    const result = await this.secretsManager.getSecretValue({ SecretId: `${secretName}` }).promise();
    return JSON.parse(result.SecretString || '{}');
  }





  /**
   * Create an IAM user.
   * @param userName - The name of the IAM user.
   * @param tempCredentials - Temperory credentials
   * @returns The IAM user's ARN.
   */
  async createIAMUser(userName: string, tempCredentials: any, roleName: string, policyName: string): Promise<{iamUserArn: string, iamRoleArn: string, error?: Error}> {
    // Instantiate IAM with temporary credentials
    const iam = new IAM({
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
      region: 'us-east-1', // Make sure to use the appropriate region
    });

    try{
        console.log('Creating IAM User...')

        // Create IAM User
        const createUserParams = { UserName: userName };
        const createUserResult = await iam.createUser(createUserParams).promise();
        const iamUserArn = createUserResult.User?.Arn || '';
    
        console.log('IAM User Created')
    
        // Introduce a delay
        const delay = 10000; // Delay of 5000 milliseconds (10 seconds)
        await new Promise(resolve => setTimeout(resolve, delay));
    
        // Assume Role Policy Document
        const assumeRolePolicyDocument = JSON.stringify({
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              Principal: { "AWS": iamUserArn.toString().trim() },
              "Action": "sts:AssumeRole"
            }
          ]
        });
    
        // Create Role
        const iamRoleArn = await this.createIAMRole(roleName, assumeRolePolicyDocument, tempCredentials);
        console.log('roleArn >> ', iamRoleArn);
    
        const policyDocument = JSON.stringify({
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "VisualEditor0",
                    "Effect": "Allow",
                    "Action": [
                        "secretsmanager:GetResourcePolicy",
                        "secretsmanager:UntagResource",
                        "secretsmanager:GetSecretValue",
                        "secretsmanager:DescribeSecret",
                        "secretsmanager:PutSecretValue",
                        "secretsmanager:ListSecretVersionIds",
                        "secretsmanager:TagResource",
                        "secretsmanager:UpdateSecret",
                        "secretsmanager:ListSecrets",
                        "secretsmanager:BatchGetSecretValue",
                        "secretsmanager:CreateSecret"
                    ],
                    "Resource": `arn:aws:secretsmanager:us-east-1:526421573600:secret:${userName}-secret-*`
                }
            ]
        })
    
        /*const policyDocument = JSON.stringify({
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "VisualEditor0",
                    "Effect": "Allow",
                    "Action": [
                        "secretsmanager:GetResourcePolicy",
                        "secretsmanager:UntagResource",
                        "secretsmanager:GetSecretValue",
                        "secretsmanager:DescribeSecret",
                        "secretsmanager:PutSecretValue",
                        "secretsmanager:ListSecretVersionIds",
                        "secretsmanager:TagResource",
                        "secretsmanager:UpdateSecret",
                        "secretsmanager:ListSecrets",
                        "secretsmanager:BatchGetSecretValue",
                        "secretsmanager:CreateSecret"
                    ],
                    "Resource": `arn:aws:secretsmanager:us-east-1:526421573600:secret:${userName}-secret-*`,
                    "Condition": {
                        "StringEquals": {
                            "aws:PrincipalAccount": "526421573600"
                        },
                        "IpAddress": {
                            "aws:SourceIp": [
                                "54.237.170.227/32",
                                "111.92.8.234/32"
                            ]
                        }
                    }
                }
            ]
        })*/
    
        // Create Policy
        const policyArn = await this.createPolicy(policyName, policyDocument, tempCredentials);
        console.log('policyArn >> ', policyArn);
    
        // Attach Policy to Role
        await this.attachPolicyToRole(roleName, policyArn, tempCredentials);
    
        return { iamUserArn, iamRoleArn };
    } catch (error) {
      console.error(`Error creating IAM user ${userName}:`, error);
      return { iamUserArn: '', iamRoleArn: '', error }; // Return error
    }

    
  }



  async createIAMRole(roleName: string, assumeRolePolicyDocument: string, tempCredentials: any): Promise<string> {
    // Instantiate IAM with temporary credentials
    const iam = new IAM({
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
      region: 'us-east-1', 
    });

    const createRoleParams = {
      RoleName: roleName,
      AssumeRolePolicyDocument: assumeRolePolicyDocument, 
    };
    const role = await iam.createRole(createRoleParams).promise();
    return role.Role.Arn;
  }

  async attachPolicyToRole(roleName: string, policyArn: string, tempCredentials: any): Promise<void> {
    // Instantiate IAM with temporary credentials
    const iam = new IAM({
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
      region: 'us-east-1', // Make sure to use the appropriate region
    });

    const attachRolePolicyParams = {
      RoleName: roleName,
      PolicyArn: policyArn,
    };
    await iam.attachRolePolicy(attachRolePolicyParams).promise();
  }

  async createPolicy(policyName: string, policyDocument: string, tempCredentials: any): Promise<string> {
    // Instantiate IAM with temporary credentials
    const iam = new IAM({
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
      region: 'us-east-1', // Make sure to use the appropriate region
    });

    const createPolicyParams = {
      PolicyName: policyName,
      PolicyDocument: policyDocument, // JSON string
    };
    const policy = await iam.createPolicy(createPolicyParams).promise();
    return policy.Policy.Arn;
  }
  
  async createAccessKeyForUser(userName: string,  tempCredentials: any): Promise<{AccessKeyId: string, SecretAccessKey: string}> {
    // Instantiate IAM with temporary credentials
    const iam = new IAM({
      accessKeyId: tempCredentials.AccessKeyId,
      secretAccessKey: tempCredentials.SecretAccessKey,
      sessionToken: tempCredentials.SessionToken,
      region: 'us-east-1', // Make sure to use the appropriate region
    });

    const createAccessKeyParams = { UserName: userName };
    const accessKeyData = await iam.createAccessKey(createAccessKeyParams).promise();
    return {
      AccessKeyId: accessKeyData.AccessKey.AccessKeyId,
      SecretAccessKey: accessKeyData.AccessKey.SecretAccessKey
    };
  }

  async createNamespaceWithCredentials(namespace: string, credentials: any): Promise<void> {
    const secretsManager = new SecretsManager({
      credentials: credentials,
      region: 'us-east-1', // Adjust the region as necessary
    });

    const createNamespaceParams = {
      Name: namespace, // The name of the secret is used as the namespace
      SecretString: '{}', // Empty JSON string or some initial value
    };

    await secretsManager.createSecret(createNamespaceParams).promise();
  }

  async createSecretWithCredentials(secretName: string, secretValue: string, credentials: any): Promise<void> {
    // Instantiate SecretsManager with provided credentials
    this.secretsManager = new SecretsManager({
      region: 'us-east-1',  
      credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });

    const createSecretParams = {
      Name: secretName,
      SecretString: secretValue,
    };

    await this.secretsManager.createSecret(createSecretParams).promise();
  }





  


  /**
   * Update a secret in AWS Secrets Manager.
   * @param secretName - The name or ARN of the secret to update.
   * @param secretValue - The new value for the secret.
   */
  async updateSecret(secretName: string, secretValue: string, credentials: any): Promise<void> {
    try {
        // Instantiate SecretsManager with provided credentials
        this.secretsManager = new SecretsManager({
          region: 'us-east-1',  
          credentials: {
            accessKeyId: credentials.AccessKeyId,
            secretAccessKey: credentials.SecretAccessKey,
            sessionToken: credentials.SessionToken,
          },
        });

        const updateSecretParams = {
          SecretId: secretName,
          SecretString: secretValue,
        };

        await this.secretsManager.updateSecret(updateSecretParams).promise();
        console.log(`Secret ${secretName} updated successfully.`);
    } catch (error) {
        console.error(`Error updating secret ${secretName}:`, error);
        throw error;
    }
  }

}
