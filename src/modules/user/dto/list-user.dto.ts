import { PaginationDTO } from 'src/common/dto/pagination.dto';

export class ListUserDto extends PaginationDTO {
  userName?: string;
}
