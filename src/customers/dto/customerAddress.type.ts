import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CustomerAddressType {
  @Field(() => Int)
  id: number;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  country: string;

  @Field()
  isDefault: boolean;
}
