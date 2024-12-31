import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerWishListService } from './customer-wish-list.service';
import { CustomerWishList } from './entities/customer-wish-list.entity';
import { CreateCustomerWishListInput } from './dto/create-customer-wish-list.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => CustomerWishList)
export class CustomerWishListResolver {
  constructor(
    private readonly customerWishListService: CustomerWishListService,
  ) {}

  @Mutation(() => CustomerWishList)
  @UseGuards(GqlAuthGuard)
  createCustomerWishList(
    @Args('createCustomerWishListInput')
    createCustomerWishListInput: CreateCustomerWishListInput,
  ) {
    return this.customerWishListService.create(createCustomerWishListInput);
  }

  @Mutation(() => CustomerWishList)
  @UseGuards(GqlAuthGuard)
  removeCustomerWishList(
    @Args('customerId', { type: () => Int }) customerId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.customerWishListService.remove(customerId, productId);
  }
}
