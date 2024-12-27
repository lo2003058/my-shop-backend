import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TiersType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  requiredPoints: number;
}
