import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipCode: number;

  @IsNotEmpty()
  line1: string;

  line2?: string;
}
