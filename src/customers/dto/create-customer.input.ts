import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  country_code: string;

  @Field({ nullable: true })
  @IsString()
  phone: string;

  @Field(() => Boolean)
  @IsBoolean()
  isEmailVerified: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  isPhoneVerified: boolean;

  @Field()
  @IsBoolean()
  isSubscribed: boolean;
}
