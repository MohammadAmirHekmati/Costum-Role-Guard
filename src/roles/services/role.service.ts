import { Body, ConflictException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { UpdateRoleDto } from '../dto/role/update-role.dto';
import { AssignRoleToRouteDto } from '../dto/assigns/assign-role-to-route.dto';
import { Errors } from '../../auth/errors/errors';
import { RouteRepository } from '../repositories/route.repository';
import { RouteEntity } from '../entities/route.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleRepository) private readonly roleRepository:RoleRepository,
              @InjectRepository(RouteRepository) private readonly routeRepository:RouteRepository
              )
  {}

  async createRole(createRoleDto:CreateRoleDto):Promise<RoleEntity>
  {
    return await this.roleRepository.createRole(createRoleDto)
  }

  async getAllRoles():Promise<any>
  {
    return await this.roleRepository.find({where:{enabled:true}})
  }

  async updateRole(role_id:string,updateRoleDto:UpdateRoleDto):Promise<any>
  {
    return await this.roleRepository.updateRole(role_id, updateRoleDto)
  }

  async desableRole(role_id:string):Promise<void>
  {
    const role=await this.roleRepository.findOne({where:{id:role_id,enabled:true}})
    if (!role)
      throw new NotFoundException()
    role.enabled=false
    const saved_role=await this.roleRepository.save(role)
  }

  async assignRouteToRole(assignRoleToRouteDto:AssignRoleToRouteDto):Promise<RouteEntity>
  {
    const route=await this.routeRepository.findOne({where:{id:assignRoleToRouteDto.route_id,deleted:false},relations:['roles']})
    if (!route)
      throw new NotFoundException(Errors.Route_Not_Found)

    const role=await this.roleRepository.findOne({where:{id:assignRoleToRouteDto.role_id,enabled:true}})
    if (!role)
      throw new NotFoundException(Errors.Role_Not_Found)

    const duplicate_role=route.roles.find(x=>x.id==assignRoleToRouteDto.role_id)
    if (duplicate_role)
      throw new ConflictException(Errors.Role_Duplicate_Error)

    route.roles.push(role)
    const saved_role=await this.routeRepository.save(route)
    return saved_role
  }
}