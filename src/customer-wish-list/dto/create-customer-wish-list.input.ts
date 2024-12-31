import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCustomerWishListInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  customerId: number;
}
