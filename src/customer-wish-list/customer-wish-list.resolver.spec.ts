import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWishListResolver } from './customer-wish-list.resolver';
import { CustomerWishListService } from './customer-wish-list.service';

describe('CustomerWishListResolver', () => {
  let resolver: CustomerWishListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerWishListResolver, CustomerWishListService],
    }).compile();

    resolver = module.get<CustomerWishListResolver>(CustomerWishListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
