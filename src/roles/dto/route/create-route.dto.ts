import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {

  @ApiProperty()
  address:string

  @ApiProperty()
  method:string

  @ApiProperty()
  body?:string

  @ApiProperty()
  param?:string
}