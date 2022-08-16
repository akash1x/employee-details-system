import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  zipCode: number;

  @IsNotEmpty()
  @ApiProperty()
  line1: string;

  @ApiProperty()
  line2?: string;
}
