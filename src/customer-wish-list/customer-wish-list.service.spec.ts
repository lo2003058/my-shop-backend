import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWishListService } from './customer-wish-list.service';

describe('CustomerWishListService', () => {
  let service: CustomerWishListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerWishListService],
    }).compile();

    service = module.get<CustomerWishListService>(CustomerWishListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
