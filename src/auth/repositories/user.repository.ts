import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserLoginDto } from '../dto/user.login.dto';
import { Errors } from '../errors/errors';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

  async registerUser(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    const user=new UserEntity()
    user.username=userRegisterDto.username
    user.password=userRegisterDto.password
    const saved_user=await this.save(user)
    return saved_user
  }

  async userLogin(userLoginDto:UserLoginDto):Promise<string>
  {
    const user=await this.findOne({where:{username:userLoginDto.username}})
    if (!user)
      throw new NotFoundException(Errors.User_Not_Exist)


    if (user.password!==userLoginDto.password)
      throw new BadRequestException(Errors.Password_Is_Not_Match)

    return user.id
  }
}