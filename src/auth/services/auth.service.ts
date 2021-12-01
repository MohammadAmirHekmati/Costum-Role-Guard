import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserEntity } from '../entities/user.entity';
import { Errors } from '../errors/errors';
import { UserLoginDto } from '../dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import { AssignUserToRoleDto } from '../dto/assign-user-to-role.dto';
import { RoleRepository } from '../../roles/repositories/role.repository';
import { DeleteRoleOfUserDto } from '../dto/delete-role-of-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository:UserRepository,
              @InjectRepository(RoleRepository) private readonly roleRepository:RoleRepository,
              private jwtService:JwtService
              ) {
  }

  async registerUser(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    if (await this.userRepository.findOne({where:{username:userRegisterDto.username}}))
      throw new ConflictException(Errors.Username_Aleardy_Exist)
    return await this.userRepository.registerUser(userRegisterDto)
  }

  async userLogin(userLoginDto:UserLoginDto):Promise<string> {
    const userLogin_result = await this.userRepository.userLogin(userLoginDto)
    const payload = {userLogin_result}
    const token = await this.jwtService.sign(payload)

    return token
  }

  async getAllUsers():Promise<any>
  {
    return await this.userRepository.find({relations:['roles']})
  }

  async assignRolesToUser(assignUserToRoleDto:AssignUserToRoleDto):Promise<UserEntity>
  {
    const user=await this.userRepository.findOne({where:{id:assignUserToRoleDto.user_id},relations:['roles']})
    if (!user)
      throw new NotFoundException(Errors.User_Not_Exist)

    const role=await this.roleRepository.findOne({where:{id:assignUserToRoleDto.role_id,enabled:true}})
    if (!role)
      throw new NotFoundException(Errors.Role_Not_Found)

    const duplicate_role=user.roles.find(x=>x.id==assignUserToRoleDto.role_id)
    if (duplicate_role)
      throw new BadRequestException(Errors.Role_Duplicate_Error)

    user.roles.push(role)
    const saved_user=await this.userRepository.save(user)
    return saved_user
  }

  async deleteRoleOfUser(deleteRoleOfUserDto:DeleteRoleOfUserDto):Promise<UserEntity>
  {
    const user=await this.userRepository.findOne({where:{id:deleteRoleOfUserDto.user_id},relations:['roles']})
    if (!user)
      throw new NotFoundException(Errors.User_Not_Exist)

    const role=await this.roleRepository.findOne({where:{id:deleteRoleOfUserDto.role_id,enabled:true}})
    if (!role)
      throw new NotFoundException(Errors.Role_Not_Found)

    const roleExist=user.roles.find(x=>x.id==deleteRoleOfUserDto.role_id)
    if (!roleExist)
      throw new BadRequestException(Errors.Role_NotFound_For_User)

    const find_role_index=user.roles.findIndex(x=>x.id==deleteRoleOfUserDto.role_id)
    user.roles.splice(find_role_index,1)

    const saved_user=await this.userRepository.save(user)
    return saved_user
  }
}