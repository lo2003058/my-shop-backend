// src/products/products.resolver.ts

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType } from './dto/product.type';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => ProductType)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductType], { name: 'products' })
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async findAll() {
    return this.productsService.findAll();
  }

  @Query(() => ProductType, { name: 'product' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Query(() => ProductType, { name: 'productForClient' })
  async findOneForClient(
    @Args('id', { type: () => Int }) id: number,
    @Args('cid', { type: () => Int }) cid: number,
  ) {
    return this.productsService.findOneForClient(id, cid);
  }

  @Mutation(() => ProductType)
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => ProductType)
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const { id, ...updateData } = updateProductInput;
    return this.productsService.update(id, updateData);
  }

  @Mutation(() => ProductType)
  // @UseGuards(GqlAuthGuard) // Temporarily disable
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
