import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { AssignRoleToRouteDto } from '../dto/assigns/assign-role-to-route.dto';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService:RoleService)
  {}

  @Post('create')
  async createRole(@Body() createRoleDto:CreateRoleDto):Promise<any>
  {
    return await this.roleService.createRole(createRoleDto)
  }

  @Get('getall')
  async getAllRoles():Promise<any>
  {
    return await this.roleService.getAllRoles()
  }

  @Patch('update/:id')
  async updateRole(@Param('id') role_id:string, @Body() updateRoleDto:UpdateRoleDto):Promise<any>
  {
    return await this.roleService.updateRole(role_id, updateRoleDto)
  }

  @Delete('desable/:id')
  async desableRole(@Param('id') role_id:string):Promise<any>
  {
    return await this.roleService.desableRole(role_id)
  }

  @Post('assign/route/to/role')
  async assignRouteToRole(@Body() assignRoleToRouteDto:AssignRoleToRouteDto):Promise<any>
  {
    return await this.roleService.assignRouteToRole(assignRoleToRouteDto)
  }
}