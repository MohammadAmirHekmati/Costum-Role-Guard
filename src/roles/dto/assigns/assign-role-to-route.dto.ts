import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleToRouteDto {

  @ApiProperty()
  role_id:string

  @ApiProperty()
  route_id:string
}