import { CreateCustomerWishListInput } from './create-customer-wish-list.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerWishListInput extends PartialType(
  CreateCustomerWishListInput,
) {}
