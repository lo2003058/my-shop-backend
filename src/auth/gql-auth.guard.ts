import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GqlAuthGuard extends the default AuthGuard to work with GraphQL's ExecutionContext.
 * It extracts the request from the GraphQL context and delegates authentication to the JWT strategy.
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  /**
   * Overrides the getRequest method to extract the request from the GraphQL context.
   * @param context - The execution context.
   * @returns The HTTP request object.
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
