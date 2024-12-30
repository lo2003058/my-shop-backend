import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressInput } from './dto/create-customer-address.input';
import { UpdateCustomerAddressInput } from './dto/update-customer-address.input';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerAddress } from '@prisma/client';

@Injectable()
export class CustomerAddressService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerAddressInput: CreateCustomerAddressInput) {
    return 'This action adds a new customerAddress';
  }

  findAll() {
    return `This action returns all customerAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAddress`;
  }

  async findAllByCustomerId(id: number): Promise<CustomerAddress[]> {
    return this.prisma.customerAddress.findMany({
      where: {
        customerId: id,
      },
    });
  }

  update(id: number, updateCustomerAddressInput: UpdateCustomerAddressInput) {
    return `This action updates a #${id} customerAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAddress`;
  }
}
