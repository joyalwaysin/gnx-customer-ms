import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { method, url, params } = request;
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(async (response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        let logLevel = 'info';

        if (isErrorResponse(response)) {
          logLevel = 'error';
        }

        // Extract decoded token information from the request object
        const decodedToken = request.user;
        const { permission, role, userId } = decodedToken || {};

        // Log the request information along with token payload data
        const successLogMessage = `${logLevel}: ${method} ${url} Params: ${JSON.stringify(
          params,
        )} Response Time: ${responseTime}ms Timestamp: ${timestamp} UserID: ${userId}  Role: ${role} Permission: ${permission}`;
        this.logger.log(successLogMessage, responseTime); // Log success details

        // Log metering data for both success and error scenarios
        await this.logger.meteringLog(
          timestamp,
          url,
          'api latency',
          userId,
          responseTime,
          params,
        );
      }),
      catchError(async (error) => {
        const errorTimestamp = new Date().toISOString();
        const controllerInstance = context.getClass();
        const controllerName = controllerInstance.name;
        const queryParams = request.query; // This will contain all the query parameters
        const logLevel = 'error';
        const logData = {
          timestamp: errorTimestamp,
          level: logLevel,
          message: 'An error occurred during request',
          error: {
            message: error.message,
            name: error.name,
            stack: error.stack,
          },
          location: '',
        };

        // Extract decoded token information from the request object for error logs
        const decodedToken = request.user;
        const { permission, role, userId, tenantId } = decodedToken || {};

        // Append token payload data to the error log
        let logMessage = JSON.stringify(logData);
        logMessage += `\nToken Info: Permission - ${permission}, Role - ${role}, UserID - ${userId}, TenantID - ${tenantId}`;
        logMessage += `\nController: ${controllerName}`;
        logMessage += `\nschema name: ${JSON.stringify(queryParams)}`;
        // Log the error message along with token payload data
        this.logger.error(logMessage, logData.location);

        // Metering log for error scenario
        this.logger.meteringLog(
          errorTimestamp,
          url,
          'api latency',
          userId,
          0,
          params,
        );

        return throwError(error);
      }),
    );
  }
}

function isErrorResponse(response: any): response is { statusCode: number } {
  return (
    typeof response === 'object' &&
    response !== null &&
    'statusCode' in response &&
    typeof response['statusCode'] === 'number'
  );
}
