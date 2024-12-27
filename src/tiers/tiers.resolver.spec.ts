import { Test, TestingModule } from '@nestjs/testing';
import { TiersResolver } from './tiers.resolver';
import { TiersService } from './tiers.service';

describe('TiersResolver', () => {
  let resolver: TiersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiersResolver, TiersService],
    }).compile();

    resolver = module.get<TiersResolver>(TiersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
