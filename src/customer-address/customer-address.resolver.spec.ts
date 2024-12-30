import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressResolver } from './customer-address.resolver';
import { CustomerAddressService } from './customer-address.service';

describe('CustomerAddressResolver', () => {
  let resolver: CustomerAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAddressResolver, CustomerAddressService],
    }).compile();

    resolver = module.get<CustomerAddressResolver>(CustomerAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
