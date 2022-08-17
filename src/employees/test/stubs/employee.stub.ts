import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { Employee } from 'src/employees/entities/employee.entity';

export const employeeStub = (): Employee => {
  return {
    name: 'akash',
    email: 'akash@gmail.com',
    phoneNumber: 7788996655,
    dateOfBirth: new Date(1990, 4, 11),
    dateOfEmployement: new Date(2022, 5, 13),
    isDeleted: false,
    address: {
      city: 'Pune',
      zipCode: 225566,
      line1: 'ajskajs',
    },
  };
};

export const createEmployeeStub = (): CreateEmployeeDto => {
  return {
    name: 'akash',
    email: 'akash@gmail.com',
    phoneNumber: 7788996655,
    dateOfBirth: new Date(1990, 4, 11),
    dateOfEmployement: new Date(2022, 5, 13),
    address: {
      city: 'Pune',
      zipCode: 225566,
      line1: 'ajskajs',
    },
  };
};
