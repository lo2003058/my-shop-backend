import { Module } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { TiersResolver } from './tiers.resolver';

@Module({
  providers: [TiersResolver, TiersService],
})
export class TiersModule {}
