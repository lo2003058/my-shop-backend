import { CreateTierInput } from './create-tier.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTierInput extends PartialType(CreateTierInput) {
  @Field(() => Int)
  id: number;
}
