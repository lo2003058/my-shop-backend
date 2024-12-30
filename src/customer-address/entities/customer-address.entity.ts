import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CustomerAddress {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
