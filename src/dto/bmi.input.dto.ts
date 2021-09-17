import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female'
}

export class BmiCalculateInputDto {
  @IsNotEmpty()
  @Type(() => String)
  @IsEnum(GenderEnum)
  Gender: GenderEnum;
  
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(300)
  HeightCm: number;
  
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(300)
  WeightKg: number;
}
