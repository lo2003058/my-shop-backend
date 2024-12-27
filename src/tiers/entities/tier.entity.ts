import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tier {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
