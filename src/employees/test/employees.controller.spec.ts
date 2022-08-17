import { Test } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { ResponseMessage } from '../enums/ResponseMessage.enum';
import { createEmployeeStub, employeeStub } from './stubs/employee.stub';
import { EmployeeServiceMock } from './__mocks__/employees.service';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: EmployeeServiceMock,
        },
      ],
    }).compile();

    employeesController = module.get<EmployeesController>(EmployeesController);
    employeesService = module.get<EmployeesService>(EmployeesService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let response;

      beforeEach(async () => {
        response = await employeesController.create(createEmployeeStub());
      });

      test('then it should call employeesService create method', () => {
        expect(employeesService.create).toHaveBeenCalledWith(
          createEmployeeStub(),
        );
      });

      test('then it should return employee with status message', () => {
        expect(response.body).toEqual(employeeStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let response;

      beforeEach(async () => {
        response = await employeesController.findAll(1);
      });

      test('then it should call employeesService findAll method', () => {
        expect(employeesService.findAll).toHaveBeenCalledWith(1, false);
      });

      test('then it should return list of employee with status message', () => {
        expect(response.body).toEqual([employeeStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let response;

      beforeEach(async () => {
        response = await employeesController.findOne('123');
      });

      test('then it should call employeesService findOne method', () => {
        expect(employeesService.findOne).toHaveBeenCalledWith('123');
      });

      test('then it should return employee with status message', () => {
        expect(response.body).toEqual(employeeStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let response;

      beforeEach(async () => {
        response = await employeesController.update('123', { name: 'Rakesh' });
      });

      test('then it should call employeesService with update method', () => {
        expect(employeesService.update).toHaveBeenCalledWith('123', {
          name: 'Rakesh',
        });
      });

      test('then it should return successfull status message', () => {
        expect(response.message).toEqual(ResponseMessage.RECORD_UPDATED);
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let response;

      beforeEach(async () => {
        response = await employeesController.remove('123');
      });

      test('then it should call employeesService with remove method', () => {
        expect(employeesService.remove).toHaveBeenCalledWith('123');
      });

      test('then it should return successfull status message', () => {
        expect(response.message).toEqual(ResponseMessage.RECORD_DELETED);
      });
    });
  });
});
