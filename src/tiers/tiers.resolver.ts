import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiersService } from './tiers.service';
import { Tier } from './entities/tier.entity';
import { CreateTierInput } from './dto/create-tier.input';
import { UpdateTierInput } from './dto/update-tier.input';

@Resolver(() => Tier)
export class TiersResolver {
  constructor(private readonly tiersService: TiersService) {}

  @Mutation(() => Tier)
  createTier(@Args('createTierInput') createTierInput: CreateTierInput) {
    return this.tiersService.create(createTierInput);
  }

  @Query(() => [Tier], { name: 'tiers' })
  findAll() {
    return this.tiersService.findAll();
  }

  @Query(() => Tier, { name: 'tier' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tiersService.findOne(id);
  }

  @Mutation(() => Tier)
  updateTier(@Args('updateTierInput') updateTierInput: UpdateTierInput) {
    return this.tiersService.update(updateTierInput.id, updateTierInput);
  }

  @Mutation(() => Tier)
  removeTier(@Args('id', { type: () => Int }) id: number) {
    return this.tiersService.remove(id);
  }
}
