import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateCustomerAddressInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  country_code: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field()
  @IsString()
  country: string;

  @Field()
  @IsString()
  zipCode: string;

  @Field(() => Boolean)
  @IsBoolean()
  isDefault: boolean;

  @Field(() => Int)
  @IsInt()
  customerId: number;
}
