import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error) // Catch all types of errors
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpMethod = request.method; // Get the HTTP method (GET, POST, PUT, DELETE, etc.)

    console.error('Caught an error:', error.message);

    // Customize the error response as needed
    response.status(500).json({
      isError: true,
      statusCode: 500,
      error: {
        description: 'Internal Server Error',
        message: ['Something went wrong on our end. Please try again later.'],
        method: httpMethod, // Include the HTTP method in the response
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
