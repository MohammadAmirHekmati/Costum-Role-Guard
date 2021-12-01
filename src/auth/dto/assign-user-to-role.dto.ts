import { ApiProperty } from '@nestjs/swagger';

export class AssignUserToRoleDto {

  @ApiProperty()
  user_id:string

  @ApiProperty()
  role_id:string
}