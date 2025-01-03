import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

@InputType()
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
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
