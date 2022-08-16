import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { of } from 'await-of';
import { ResponseMessage } from './enums/ResponseMessage.enum';

@Injectable()
export class EmployeesService {
  private logger: Logger;
  defaultPage = 1;
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {
    this.logger = new Logger('EmployeesService');
  }
  async create(createEmployeeDto: CreateEmployeeDto) {
    this.logger.log('Create(): Processing of creating employee record started');
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    const [employee, err] = await of(createdEmployee.save());
    if (err) {
      this.logger.error('Create():', err);
      throw new HttpException(
        ResponseMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.log('Create(): Finished saving employee record');
    const response = {
      message: ResponseMessage.RECORD_CREATED,
      body: employee,
    };
    return response;
  }

  async findAll(page: number = this.defaultPage, isDeleted: boolean) {
    this.logger.log('fildAll(): Processing getting all employees');

    const [employees, err] = await of(
      this.employeeModel
        .find({ isDeleted })
        .skip(5 * (page - 1))
        .limit(5)
        .exec(),
    );
    if (err) {
      this.logger.error('findAll():', err);
      throw new HttpException(
        ResponseMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response = {
      message: ResponseMessage.RECORDS_RETRIEVED,
      body: employees,
    };
    return response;
  }

  async findOne(id: string) {
    this.logger.log('findOne(): Processing getting an employee with id' + id);
    const [employee, err] = await of(
      this.employeeModel.findById(id).where({ softDeleteStatus: false }).exec(),
    );
    if (!employee) {
      this.logger.error('findOne(): No employe found with this ID' + id);
      throw new HttpException(
        ResponseMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (err) {
      this.logger.error('findOne():', err);
      throw new HttpException(
        ResponseMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response = {
      message: ResponseMessage.RECORDS_RETRIEVED,
      body: employee,
    };

    return response;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log('update(): Processing updating an employee with id' + id);
    const [, err] = await of(
      this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto).exec(),
    );

    if (err) {
      this.logger.error('update():', err);
      throw new HttpException(
        ResponseMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = {
      message: ResponseMessage.RECORD_UPDATED,
    };
    return response;
  }

  async remove(id: string) {
    this.logger.log('remove(): Processing deleting an employee with id' + id);
    const [employee, err1] = await of(
      this.employeeModel.findById(id).where({ isDeleted: false }).exec(),
    );
    if (err1 || !employee) {
      this.logger.error('remove(): No employe found with this ID' + id);
      throw new HttpException(
        ResponseMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    employee.isDeleted = true;

    const [, err2] = await of(employee.save());
    if (err2) {
      this.logger.error('remove():', err2);
      throw new HttpException(
        ResponseMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response = {
      message: ResponseMessage.RECORD_DELETED,
    };
    return response;
  }
}
