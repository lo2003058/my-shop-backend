import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all products.
   * @returns An array of products.
   */
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  /**
   * Retrieves a single product by ID.
   * @param id - The ID of the product.
   * @returns The product.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  /**
   * Creates a new product.
   * @param createProductDto - Data Transfer Object for creating a product.
   * @returns The created product.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param updateProductDto - Data Transfer Object for updating a product.
   * @returns The updated product.
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Check if product exists
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  /**
   * Removes a product.
   * @param id - The ID of the product to remove.
   * @returns The removed product.
   */
  async remove(id: number): Promise<Product> {
    // Check if product exists
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
