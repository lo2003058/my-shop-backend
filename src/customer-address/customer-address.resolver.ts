import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddress } from './entities/customer-address.entity';
import { CreateCustomerAddressInput } from './dto/create-customer-address.input';
import { UpdateCustomerAddressInput } from './dto/update-customer-address.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CustomerAddress)
export class CustomerAddressResolver {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Mutation(() => CustomerAddress)
  createCustomerAddress(
    @Args('createCustomerAddressInput')
    createCustomerAddressInput: CreateCustomerAddressInput,
  ) {
    return this.customerAddressService.create(createCustomerAddressInput);
  }

  @Query(() => [CustomerAddress], { name: 'customerAddress' })
  findAll() {
    return this.customerAddressService.findAll();
  }

  @Query(() => [CustomerAddress], { name: 'getAllCustomerAddress' })
  @UseGuards(GqlAuthGuard)
  findAllByCustomerId(@Args('id', { type: () => Int }) id: number) {
    return this.customerAddressService.findAllByCustomerId(id);
  }

  @Query(() => CustomerAddress, { name: 'customerAddress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customerAddressService.findOne(id);
  }

  @Mutation(() => CustomerAddress)
  updateCustomerAddress(
    @Args('updateCustomerAddressInput')
    updateCustomerAddressInput: UpdateCustomerAddressInput,
  ) {
    return this.customerAddressService.update(
      updateCustomerAddressInput.id,
      updateCustomerAddressInput,
    );
  }

  @Mutation(() => CustomerAddress)
  removeCustomerAddress(@Args('id', { type: () => Int }) id: number) {
    return this.customerAddressService.remove(id);
  }
}
