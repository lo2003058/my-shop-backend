import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsInt,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+\d{1,3}$/, {
    message:
      'country_code must be a valid international country code (e.g., +1)',
  })
  country_code?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  tierId?: number;
}
