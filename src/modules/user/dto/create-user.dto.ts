import { BaseDTO } from 'src/common/dto/base.dto';

export class CreateUserDto extends BaseDTO {
  userName: string;

  realName: string;

  password: string;

  gender: number;

  email: string;

  mobile: string;

  deptId: string;

  status: number;
}
