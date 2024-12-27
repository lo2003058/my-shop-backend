import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Force cast to string so 'graphql' is recognized
    const ctxType = host.getType<string>();

    if (ctxType === 'graphql') {
      GqlArgumentsHost.create(host);
      console.error('[GraphQL Error]', exception);
      // Re-throw the original error so GraphQL can handle it
      throw exception;
    }

    // Otherwise, handle HTTP
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse();
    const request = httpContext.getRequest();

    // If it's an HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse = {
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(typeof exceptionResponse === 'object'
          ? exceptionResponse
          : { message: exceptionResponse }),
      };

      response.status(status).json(errorResponse);
    } else {
      // Not an HttpException, treat as 500
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      console.error('[Unhandled Error]', exception);

      const errorResponse = {
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Internal server error',
      };

      response.status(status).json(errorResponse);
    }
  }
}
