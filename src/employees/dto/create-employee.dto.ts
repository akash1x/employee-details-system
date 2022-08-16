import { ApiProperty, ApiTags } from '@nestjs/swagger';
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

@ApiTags('employees')
export class CreateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNumber()
  @ApiProperty()
  phoneNumber: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  dateOfBirth: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  dateOfEmployement: Date;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty()
  address: CreateAddressDto;
}
