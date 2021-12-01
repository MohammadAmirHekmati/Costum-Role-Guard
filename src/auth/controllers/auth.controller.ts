import { BadRequestException, Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserLoginDto } from '../dto/user.login.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { AssignUserToRoleDto } from '../dto/assign-user-to-role.dto';
import { RoleGuard } from '../guards/role.guard';
import { DeleteRoleOfUserDto } from '../dto/delete-role-of-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Errors } from '../errors/errors';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }

  @Post('register')
  async registerUser(@Body() userRegisterDto:UserRegisterDto):Promise<any>
  {
    return await this.authService.registerUser(userRegisterDto)
  }

  @Post('login')
  async userLogin(@Body() userLoginDto:UserLoginDto):Promise<any>
  {
    return await this.authService.userLogin(userLoginDto)
  }

  @UseGuards(JwtGuard,RoleGuard)
  @Get('getall')
  async getAllUsers():Promise<any>
  {
    return await this.authService.getAllUsers()
  }

  @Post('assign/user/to/role')
  async assignUserToRole(@Body() assignUserToRoleDto:AssignUserToRoleDto):Promise<any>
  {
    return await this.authService.assignRolesToUser(assignUserToRoleDto)
  }

  @Post('delete/role/of/user')
  async deleteRoleOfUser(@Body() deleteRoleOfUserDto:DeleteRoleOfUserDto):Promise<UserEntity>
  {
    return await this.authService.deleteRoleOfUser(deleteRoleOfUserDto)
  }
}