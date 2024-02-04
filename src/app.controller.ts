// app.controller.ts

import { Controller, Post, Req, Res, Body, Get, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { AssystService } from './assyst.service';
import { AppService } from './app.service';
import { Response } from 'express';

import { CreateTenantSecretDto } from './dto/create-tenant-secret.dto';
import { GetTenantSecretDto } from './dto/get-tenant-secret.dto';
import { UpdateTenantSecretDto } from './dto/update-tenant-secret.dto';

@Controller()
@ApiTags('Secret Management')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tenantService: TenantService,
    private readonly assystService: AssystService
  ) {}

  /**
   * Get a welcome message.
   * @returns A welcome message.
   */
  @Get()
  @ApiOperation({ summary: 'Get Welcome Message' })
  @ApiResponse({ status: 200, description: 'Welcome message retrieved successfully' })
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Create a tenant secret.
   * @param createTenantSecretDto - DTO containing all input parameters.
   * @throws BadRequestException if DTO is falsy.
   * @throws Error if any operation fails.
   */
  @Post('create-tenant-secret')
  @ApiOperation({ summary: 'Create Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: CreateTenantSecretDto }) // Add swagger input annotations
  async createTenantSecret(
    @Body() createTenantSecretDto: CreateTenantSecretDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      if (!createTenantSecretDto) {
        throw new BadRequestException('Input data is required.');
      }

      const {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME,
        TENANT_DETAILS
      } = createTenantSecretDto;

      const createTenantResponse = await this.tenantService.createTenantSecret(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME,
        TENANT_DETAILS
      );

      console.log('Create Tenant Response >> ', createTenantResponse)

      if(createTenantResponse){
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Tenant secret created successfully'
          // data: createTenantResponse
        });
      }
      else{
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Intenal server error'
        });
      }

    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle bad request errors
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        });
      } else if (error instanceof HttpException) {
        // Return the error response from the service
        return res.status(error.getStatus()).json({
          statusCode: error.getStatus(),
          message: error.getResponse(),
        });
      } else {
        // Handle other types of errors
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was a problem retrieving the tenant secret',
          error: error.message
        });
      }
    }
  }

  /**
   * Get a tenant secret.
   * @param getTenantSecretDto - DTO containing all input parameters.
   * @throws BadRequestException if DTO is falsy.
   * @throws Error if any operation fails.
   */
  @Post('get-tenant-secret')
  @ApiOperation({ summary: 'Get Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: GetTenantSecretDto })
  async getTenantSecret(
    @Body() getTenantSecretDto: GetTenantSecretDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      if (!getTenantSecretDto) {
        throw new BadRequestException('Input data is required.');
      }
      
      const {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME
      } = getTenantSecretDto;

      const tenantSecretResponse = await this.tenantService.getTenantSecret(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME
      );

      console.log('tenantSecret Response >> ', tenantSecretResponse)

      if(tenantSecretResponse){
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Tenant secret retrieved successfully',
          data: tenantSecretResponse
        });
      }
      else{
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Tenant details not found'
        });
      }
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle bad request errors
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        });
      } else if (error instanceof HttpException) {
        // Return the error response from the service
        return res.status(error.getStatus()).json({
          statusCode: error.getStatus(),
          message: error.getResponse(),
        });
      } else {
        // Handle other types of errors
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was a problem retrieving the tenant secret',
          error: error.message
        });
      }
    }
  }

  /**
   * Update a tenant secret.
   * @param updateTenantSecretDto - DTO containing all input parameters.
   * @throws BadRequestException if DTO is falsy.
   * @throws Error if any operation fails.
   */
  @Post('update-tenant-secret')
  @ApiOperation({ summary: 'Update Tenant Secret' })
  @ApiResponse({ status: 200, description: 'Tenant secret updaated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: UpdateTenantSecretDto }) // Add swagger input annotations
  async updateTenantSecret(
    @Body() updateTenantSecretDto: UpdateTenantSecretDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      if (!updateTenantSecretDto) {
        throw new BadRequestException('Input data is required.');
      }

      const {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME,
        TENANT_DETAILS
      } = updateTenantSecretDto;

      const updateTenantResponse = await this.tenantService.updateTenantSecret(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        IAM_ROLE_ARN,
        TENANT_NAME,
        TENANT_DETAILS
      );

      console.log('Update Tenant Response >> ', updateTenantResponse)

      if(updateTenantResponse){
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Tenant secret updated successfully'
          // data: updateTenantResponse
        });
      }
      else{
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Intenal server error'
        });
      }

    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle bad request errors
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        });
      } else if (error instanceof HttpException) {
        // Return the error response from the service
        return res.status(error.getStatus()).json({
          statusCode: error.getStatus(),
          message: error.getResponse(),
        });
      } else {
        // Handle other types of errors
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There was a problem retrieving the tenant secret',
          error: error.message
        });
      }
    }
  }

  /**
   * Update Assyst Secret Key with BYOK Public Key.
   * @param data - Input data containing Assyst credentials, tenant details, and BYOK Key.
   * @throws BadRequestException if data is falsy.
   * @throws Error if any operation fails.
   */
  @Post('update-assyst-secret-key')
  @ApiOperation({ summary: 'Update Assyst Secret Key with BYOK Public Key' })
  @ApiResponse({ status: 200, description: 'Assyst secret key updated successfully' })
  async updateAssystSecretKey(@Body() data: any): Promise<void> {
    if (!data) {
      throw new BadRequestException('Input data is required.');
    }

    await this.assystService.updateAssystSecretKey(data.assystCredentials, data.tenantDetails, data.byokKey);
  }
}
