import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpCode,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  private logger: Logger;
  constructor(private readonly employeesService: EmployeesService) {
    this.logger = new Logger('EmployeesController');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.logger.log('create: Inside create employee controller');
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('page') page: number) {
    this.logger.log('findAll: Inside findAll employee controller');
    return this.employeesService.findAll(page, false);
  }

  @HttpCode(200)
  @Get('deleted')
  findAllDeletedEmployees(@Query('page') page: number) {
    this.logger.log(
      'findAllDeletedEmployees: Inside findAllDeletedEmployees employee controller',
    );
    return this.employeesService.findAll(page, true);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    this.logger.log('findOne: Inside findOne employee controller');
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    this.logger.log('update: Inside update employee controller');
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    this.logger.log('remove: Inside remove employee controller');
    return this.employeesService.remove(id);
  }
}
