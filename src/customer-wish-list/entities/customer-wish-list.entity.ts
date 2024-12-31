import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductType } from '../../products/dto/product.type';

@ObjectType()
export class CustomerWishList {
  @Field(() => Int)
  customerId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => ProductType)
  product: ProductType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
