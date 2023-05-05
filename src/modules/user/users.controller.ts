import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { Result } from 'src/common/dto/result.dto';
import { ErrorCode } from 'src/exception/error.code';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.findByName(createUserDto.userName, '');
    if (user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户名已存在',
      );
    }
    await this.usersService.create(createUserDto);
    return new Result().ok();
  }

  @Get()
  async findAll(@Query() listUserDto: ListUserDto) {
    const userList = await this.usersService.findAll(listUserDto);
    return new Result<UpdateUserDto>().ok(userList);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new Result<UpdateUserDto>().ok(user);
  }

  @Put(':id')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.findByName(
      updateUserDto.userName,
      updateUserDto.id + '',
    );
    if (user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户名已存在',
      );
    }
    await this.usersService.update(updateUserDto);
    return new Result().ok();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户不存在',
      );
    }
    user.delFlag = 1;
    await this.usersService.update(user);
    return new Result().ok();
  }
}
