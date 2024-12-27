import { Injectable } from '@nestjs/common';
import { CreateTierInput } from './dto/create-tier.input';
import { UpdateTierInput } from './dto/update-tier.input';

@Injectable()
export class TiersService {
  create(createTierInput: CreateTierInput) {
    return 'This action adds a new tier';
  }

  findAll() {
    return `This action returns all tiers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tier`;
  }

  update(id: number, updateTierInput: UpdateTierInput) {
    return `This action updates a #${id} tier`;
  }

  remove(id: number) {
    return `This action removes a #${id} tier`;
  }
}
