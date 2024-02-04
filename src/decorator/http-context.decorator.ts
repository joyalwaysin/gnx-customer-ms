/* eslint-disable prettier/prettier */
// filename: http-context.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestService = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // If your Swagger is sending query parameters in the request body,
    // make sure to parse them correctly here
    const query = request.query || {};
    return { ...request, query };
  },
);
