import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field(() => Boolean)
  isVirtual: boolean;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Boolean)
  isCustomerWishListed: boolean;
}
