import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
const { createLogger, format } = winston; // Destructure createLogger and format

@Injectable()
export class LoggerService {
  private readonly logger = createLogger({
    transports: [new winston.transports.Console()],
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({
          timestamp,
          level,
          message,
          stack,
          context,
          latency,
          api,
          user,
          tenant,
          parameters,
          controllerName,
        }) => {
          return `${timestamp} [${level}]${
            latency ? ` (+${latency}ms)` : ''
          } - ${context ? `[${context}] ` : ''}${message}${
            stack ? `\n${stack}` : ''
          } ${
            api
              ? `- API: ${api}, User: ${user}, Tenant: ${tenant}, Parameters: ${JSON.stringify(
                  parameters,
                )}`
              : ''
          }${
            controllerName ? `, Controller: ${controllerName.toString()}` : ''
          }`;
        },
      ),
    ),
  });
  private getControllerName(controllerName?: string): string {
    return controllerName ? String(controllerName) : '';
  }
  error(
    message: string,
    trace: string,
    latency?: number,
    api?: string,
    user?: string,
    tenant?: string,
    parameters?: Record<string, any>,
    controllerName?: string,
  ) {
    const logData: Record<string, any> = {
      trace,
      latency,
      api,
      user,
      tenant,
      parameters,
      controllerName: this.getControllerName(controllerName),
    };
    this.logger.error(message, logData);
  }

  warn(
    message: string,
    trace: string,
    latency?: number,
    api?: string,
    user?: string,
    tenant?: string,
    parameters?: Record<string, any>,
  ) {
    this.logger.warn(message, {
      trace,
      latency,
      api,
      user,
      tenant,
      parameters,
    });
  }

  info(
    message: string,
    latency?: number,
    api?: string,
    user?: string,
    tenant?: string,
    parameters?: Record<string, any>,
  ) {
    this.logger.info(message, { latency, api, user, tenant, parameters });
  }

  log(
    message: string,
    latency?: number,
    api?: string,
    user?: string,
    tenant?: string,
    parameters?: Record<string, any>,
  ) {
    this.logger.verbose(message, { latency, api, user, tenant, parameters });
  }

  meteringLog(
    timestamp: string,
    api: string,
    quantity: string,
    user: string,
    latency: number,
    parameters: Record<string, any>,
  ) {
    this.logger.info(
      `[${timestamp}] [Metering] - API: ${api}, Quantity: ${quantity}:${latency}ms, User: ${user}, Parameters: ${JSON.stringify(
        parameters,
      )}`,
    );
  }

  // Other custom log methods

  private customLog(logLevel: string, message: string, context?: string) {
    // Implement your custom logic here, e.g., write to a file or send to a centralized logging system
    console.log(`[${logLevel}] [${context || 'App'}] ${message}`);
  }
}
