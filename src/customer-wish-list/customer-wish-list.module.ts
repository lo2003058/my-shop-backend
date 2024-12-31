import { Module } from '@nestjs/common';
import { CustomerWishListService } from './customer-wish-list.service';
import { CustomerWishListResolver } from './customer-wish-list.resolver';

@Module({
  providers: [CustomerWishListResolver, CustomerWishListService],
})
export class CustomerWishListModule {}
