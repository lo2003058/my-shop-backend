import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // 1. Convert the ExecutionContext to a GraphQL context
    const ctx = GqlExecutionContext.create(context);

    // 2. Extract the request object
    const request = ctx.getContext().req;

    // 3. The `user` property is usually attached by your Auth Guard (e.g., JWT strategy)
    return request.user;
  },
);
