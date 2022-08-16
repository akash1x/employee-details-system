import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: number;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsDate()
  @Type(() => Date)
  dateOfEmployement: Date;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
