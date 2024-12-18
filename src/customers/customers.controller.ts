import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard) // Protects this specific route
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protects this specific route
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // Protects this specific route
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard) // Protects this specific route
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
