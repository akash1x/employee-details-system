import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;
@Schema()
class Address {
  @Prop({ type: String })
  city: string;

  @Prop({ type: Number })
  zipCode: number;

  @Prop({ type: String })
  line1: string;

  @Prop({ type: String })
  line2?: string;
}

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber: number;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  dateOfEmployement: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Address })
  address: Address;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
