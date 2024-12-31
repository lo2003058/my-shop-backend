import { Injectable } from '@nestjs/common';
import { CreateCustomerWishListInput } from './dto/create-customer-wish-list.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerWishListService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerWishListInput: CreateCustomerWishListInput) {
    return this.prisma.customerWishList.create({
      data: createCustomerWishListInput,
    });
  }

  async remove(cid: number, pid: number) {
    // Check if product exists
    return this.prisma.customerWishList.delete({
      where: {
        customerId_productId: {
          customerId: cid,
          productId: pid,
        },
      },
    });
  }
}
