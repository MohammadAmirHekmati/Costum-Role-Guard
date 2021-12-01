import { ApiProperty } from '@nestjs/swagger';

export class UpdateRouteDto {

  @ApiProperty()
  address:string

  @ApiProperty()
  method:string

  @ApiProperty()
  body?:Object

  @ApiProperty()
  param?:string|number
}