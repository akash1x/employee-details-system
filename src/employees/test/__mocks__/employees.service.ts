import { ResponseMessage } from '../../enums/ResponseMessage.enum';
import { employeeStub } from '../stubs/employee.stub';

export const EmployeeServiceMock = {
  create: jest.fn().mockResolvedValue({
    message: ResponseMessage.RECORD_CREATED,
    body: employeeStub(),
  }),

  findAll: jest.fn().mockResolvedValue({
    message: ResponseMessage.RECORDS_RETRIEVED,
    body: [employeeStub()],
  }),

  findOne: jest.fn().mockResolvedValue({
    message: ResponseMessage.RECORDS_RETRIEVED,
    body: employeeStub(),
  }),

  update: jest.fn().mockResolvedValue({
    message: ResponseMessage.RECORD_UPDATED,
  }),

  remove: jest
    .fn()
    .mockResolvedValue({ message: ResponseMessage.RECORD_DELETED }),
};
