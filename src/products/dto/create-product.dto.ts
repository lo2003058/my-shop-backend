import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsBoolean()
  isVirtual: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
