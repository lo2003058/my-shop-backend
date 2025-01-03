import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer, Prisma } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcryptjs';

interface FindCustomerOptions {
  include?: Prisma.CustomerInclude;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds a customer by email.
   * @param email - The customer's email.
   * @param options - Additional query options (excluding 'where').
   * @returns The customer if found.
   */
  async findByEmail(
    email: string,
    options?: FindCustomerOptions,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { email },
      ...options,
    });
  }

  /**
   * Creates a new customer.
   * @param createCustomerDto - Data Transfer Object containing customer details.
   * @returns The created customer.
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { email, password, tierId, ...rest } = createCustomerDto;

    // Check if email already exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (existingCustomer) {
      throw new BadRequestException('Email already in use.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer with relations
    return this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        ...rest,
        customerPoints: {
          create: {
            currentPoints: 0,
            accumulatedPoints: 0,
            totalAccumulatedPoints: 0,
          },
        },
        tier: tierId
          ? {
              connect: { id: tierId },
            }
          : undefined,
      },
      include: {
        customerPoints: true,
        tier: true,
      },
    });
  }

  async registerCreate(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { email, password, tierId, ...rest } = createCustomerDto;

    // Check if email already exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (existingCustomer) {
      throw new BadRequestException('Email already in use.');
    }

    // Create customer with relations
    return this.prisma.customer.create({
      data: {
        email,
        password: password,
        ...rest,
        customerPoints: {
          create: {
            currentPoints: 0,
            accumulatedPoints: 0,
            totalAccumulatedPoints: 0,
          },
        },
        tier: tierId
          ? {
              connect: { id: tierId },
            }
          : undefined,
      },
      include: {
        customerPoints: true,
        tier: true,
      },
    });
  }

  /**
   * Retrieves all customers.
   * @returns An array of customers.
   */
  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      include: {
        customerPoints: true,
        tier: true,
        Order: true,
        customerAddress: true,
        customerWishList: true,
      },
    });
  }

  /**
   * Finds a customer by ID.
   * @param id - The customer's ID.
   * @param options - Additional query options (excluding 'where').
   * @returns The customer if found.
   */
  async findOne(
    id: number,
    options?: FindCustomerOptions,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id },
      ...options,
    });
  }

  /**
   * Updates a customer's details.
   * @param id - The ID of the customer to update.
   * @param updateCustomerDto - Data Transfer Object containing updated fields.
   * @returns The updated customer.
   */
  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    // Check if customer exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }

    // If updating email, ensure it's not already taken
    if (
      updateCustomerDto.email &&
      updateCustomerDto.email !== existingCustomer.email
    ) {
      const emailInUse = await this.prisma.customer.findUnique({
        where: { email: updateCustomerDto.email },
      });
      if (emailInUse) {
        throw new BadRequestException('Email already in use.');
      }
    }

    // If updating password, verify current password and hash new password
    if (updateCustomerDto.newPassword) {
      if (!updateCustomerDto.currentPassword) {
        throw new BadRequestException(
          'Current password is required to set a new password.',
        );
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        updateCustomerDto.currentPassword,
        existingCustomer.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect.');
      }

      // Hash the new password
      updateCustomerDto.password = await bcrypt.hash(
        updateCustomerDto.newPassword,
        10,
      );

      // Remove currentPassword and newPassword from DTO to prevent updating them in the database
      delete updateCustomerDto.currentPassword;
      delete updateCustomerDto.newPassword;
    }

    // Update customer
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
      include: {
        customerPoints: true,
        tier: true,
      },
    });
  }

  /**
   * Removes a customer by ID.
   * @param id - The ID of the customer to remove.
   * @returns The removed customer.
   */
  async remove(id: number): Promise<Customer> {
    // Check if customer exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }

    // Delete customer
    return this.prisma.customer.delete({
      where: { id },
      include: {
        customerPoints: true,
        tier: true,
      },
    });
  }
}
