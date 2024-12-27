import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsInt,
} from 'class-validator';

@InputType()
export class UpdateCustomerInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country_code?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPhoneVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isSubscribed?: boolean;

  // Fields related to password update
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Current password must be at least 6 characters' })
  currentPassword?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters' })
  newPassword?: string;
}
