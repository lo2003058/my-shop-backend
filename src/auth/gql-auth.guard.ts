import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // Override getRequest to pull the request from GraphQL context
  getRequest(context: ExecutionContext) {
    // Convert to GQL context
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
