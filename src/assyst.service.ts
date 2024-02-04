// assyst.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { AWSService } from './aws.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
@ApiTags('Assyst Management')
export class AssystService {
  constructor(private readonly awsService: AWSService) {}

  /**
   * Update Assyst Secret Key with BYOK Public Key.
   * @param assystCredentials - Assyst credentials.
   * @param tenantDetails - Tenant details.
   * @param byokKey - BYOK Public Key.
   * @throws BadRequestException if assystCredentials, tenantDetails, or byokKey is falsy.
   * @throws Error if any operation fails.
   */
  @ApiOperation({ summary: 'Update Assyst Secret Key with BYOK Public Key' })
  @ApiResponse({ status: 200, description: 'Assyst secret key updated successfully' })
  async updateAssystSecretKey(
    assystCredentials: any,
    tenantDetails: any,
    byokKey: string
  ): Promise<void> {
    if (!assystCredentials || !tenantDetails || !byokKey) {
      throw new BadRequestException('Assyst credentials, tenant details, and BYOK Key are required.');
    }

    try {
      // Step 1: Get temporary access keys using Assyst credentials
      const temporaryAccessKeys = await this.awsService.createTemporaryAccessKeys(
        assystCredentials.AWS_ACCESS_KEY_ID,
        assystCredentials.AWS_SECRET_ACCESS_KEY,
        assystCredentials.SessionToken
      );

      // Step 2: Update Assyst secret key with BYOK public key
      const byokKeyDetails = {
        publicKey: byokKey,
      };

      await this.awsService.createSecret(
        'assystNamespace',
        'assystSecretKey',
        JSON.stringify(byokKeyDetails)
      );
    } catch (error) {
      // Handle errors
      console.error('Error updating Assyst secret key:', error);
      throw new Error('Failed to update Assyst secret key');
    }
  }
}
