import { MongoMemoryServer } from 'mongodb-memory-server';
import { Employee, EmployeeSchema } from '../entities/employee.entity';
import { Connection, connect, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { createEmployeeStub, employeeStub } from './stubs/employee.stub';
import { ResponseMessage } from '../enums/ResponseMessage.enum';

describe('EmployeesService', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let employeeModel: Model<Employee>;
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    employeeModel = mongoConnection.model(Employee.name, EmployeeSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        { provide: getModelToken(Employee.name), useValue: employeeModel },
      ],
    }).compile();
    employeesController = app.get<EmployeesController>(EmployeesController);
    employeesService = app.get<EmployeesService>(EmployeesService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('create', () => {
    let response;
    beforeEach(async () => {
      response = await employeesController.create(createEmployeeStub());
    });

    test('should create the employee in DB', async () => {
      expect(response.body.name).toBe(createEmployeeStub().name);
    });

    test('should transform employee DTO to Schema Object', async () => {
      response = await new employeeModel(createEmployeeStub());
      await expect(response.name).toBe(employeeStub().name);
    });
  });

  describe('findAll', () => {
    let response;
    beforeEach(async () => {
      response = await employeesService.create(createEmployeeStub());
    });

    test('should retrieve the list of employee from DB', async () => {
      response = await employeesService.findAll(1, false);
      expect(response.body[0].name).toBe(createEmployeeStub().name);
    });

    test('should retrieve the list of deleted employee from DB', async () => {
      await employeesService.remove(response.body._id);
      response = await employeesService.findAll(1, true);
      expect(response.body[0].isDeleted).toEqual(true);
    });
  });

  describe('findOne', () => {
    let response;
    beforeEach(async () => {
      response = await employeesService.create(createEmployeeStub());
    });

    test('should retrieve the employee from DB', async () => {
      response = await employeesService.findOne(response.body._id);
      expect(response.body.name).toBe(createEmployeeStub().name);
    });
  });

  describe('update', () => {
    let response;
    beforeEach(async () => {
      response = await employeesService.create(createEmployeeStub());
    });

    test('should update the employee name', async () => {
      response = await employeesService.update(response.body._id, {
        name: 'Rajesh',
      });
      expect(response.message).toEqual(ResponseMessage.RECORD_UPDATED);
    });
    test('should throw error with invalid ID', async () => {
      try {
        response = await employeesService.update('507f1f77bcf86cd799439011', {
          name: 'xed',
        });
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
  });

  describe('remove', () => {
    let response;
    beforeEach(async () => {
      response = await employeesService.create(createEmployeeStub());
    });

    test('should soft delete the employee', async () => {
      response = await employeesService.remove(response.body._id);
      expect(response.message).toEqual(ResponseMessage.RECORD_DELETED);
    });

    test('should throw error with invalid ID', async () => {
      try {
        response = await employeesService.remove('507f1f77bcf86cd799439011');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
  });
});
