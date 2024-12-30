import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { CustomerType } from './dto/cutomer.type';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorator/current-user.decorator';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => CustomerType)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => [CustomerType], { name: 'customers' })
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async findAll() {
    return this.customersService.findAll();
  }

  @Query(() => CustomerType, { name: 'customer' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customersService.findOne(id, {
      include: {
        customerPoints: true,
        tier: true,
        Order: true,
        customerAddress: true,
      },
    });
  }

  @Mutation(() => CustomerType)
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customersService.create(createCustomerInput);
  }

  @Mutation(() => CustomerType)
  @UseGuards(GqlAuthGuard)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
    @CurrentUser() user: any, // or a custom decorator to extract from token
  ) {
    const { id, ...updateData } = updateCustomerInput;

    if (user.id !== id) {
      throw new ForbiddenException('You can only update your own account.');
    }

    return this.customersService.update(id, updateData);
  }

  @Mutation(() => CustomerType)
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async removeCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.customersService.remove(id);
  }
}
