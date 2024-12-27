import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const request = context.req;

    // Optionally log the exception
    this.logger.error(
      `Exception thrown for GraphQL request: ${exception.message}`,
      exception.stack,
    );

    // Build the response object or throw a custom GraphQL error.
    // Here we return the original HttpException for simplicity;
    // You could map it to a GraphQL error or mask it for security.
    return exception;
  }
}
