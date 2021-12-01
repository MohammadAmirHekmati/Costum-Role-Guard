import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role.dto';

@Injectable()
@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity>{

  async createRole(createRoleDto:CreateRoleDto):Promise<RoleEntity>
  {
    const duplicate_role=await this.findOne({where:{name:createRoleDto.name}})
    if (duplicate_role)
      throw new ConflictException()

    const role=new RoleEntity()
    role.name=createRoleDto.name
    role.description=createRoleDto.description
    const saved_role=await this.save(role)
    return saved_role
  }

  async updateRole(role_id:string,updateRoleDto:UpdateRoleDto):Promise<any>
  {
    const role=await this.findOne({where:{id:role_id,enabled:true}})
    if (!role)
      throw new NotFoundException()
    role.name=updateRoleDto.name
    role.description=updateRoleDto.description
    const saved_role=await this.save(role)
    return saved_role
  }
}