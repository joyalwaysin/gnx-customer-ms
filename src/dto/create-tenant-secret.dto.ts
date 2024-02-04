import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantSecretDto {
  @ApiProperty({ description: 'AWS Access Key ID for TEK secret' })
  @IsNotEmpty()
  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @ApiProperty({ description: 'AWS  Secret Access Key for TEK secret' })
  @IsNotEmpty()
  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @ApiProperty({ description: 'The IAM role ARN for TEK secret' })
  @IsNotEmpty()
  @IsString()
  IAM_ROLE_ARN: string;

  @ApiProperty({ description: 'Tenant Name or ID' })
  @IsNotEmpty()
  @IsString()
  TENANT_NAME: string;

  @ApiProperty({ description: 'Tenant details' })
  @IsNotEmpty()
  TENANT_DETAILS: any; 
}
