import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CustomerPointType {
  @Field(() => Int)
  currentPoints: number;

  @Field(() => Int)
  accumulatedPoints: number;

  @Field(() => Int)
  totalAccumulatedPoints: number;
}
