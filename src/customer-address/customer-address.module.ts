import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddressResolver } from './customer-address.resolver';

@Module({
  providers: [CustomerAddressResolver, CustomerAddressService],
})
export class CustomerAddressModule {}
