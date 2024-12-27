import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTierInput {
  @Field()
  name: string;

  @Field(() => Int)
  requiredPoints: number;
}
