import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { IRequestHeader } from '../interfaces/request.headers.interface';
import { doc } from 'prettier';
import { IPayload } from '../interfaces/payload.interface';
import { RouteRepository } from '../../roles/repositories/route.repository';


export class RoleGuard implements CanActivate{
  constructor(@InjectRepository(UserRepository) private readonly userRepository:UserRepository,
              @InjectRepository(RouteRepository) private readonly routeRepository:RouteRepository
              ) {
  }
 async canActivate(context: ExecutionContext):  Promise<boolean> {

    const request=context.switchToHttp().getRequest()
      const req_header:IRequestHeader=request.headers
    const req_baseUrl:string=req_header.host
   const req_route:string=request.originalUrl
   let full_url:string=req_baseUrl.concat(req_route)

   const getUserId:IPayload=request.user
   const user=await this.userRepository.findOne({where:{id:getUserId.userLogin_result},relations:['roles']})
   const userRoles=user.roles

   const route=await this.routeRepository.findOne({where:{address:full_url},relations:['roles']})
    const routesRoles=route.roles

   const userRolesId=userRoles.map(p=>p.id)
   const routeRolesId=routesRoles.map(p=>p.id)


   // routeRolesId.some((role)=>userRolesId?.includes(role))
   const canUserPass=userRolesId.some((role)=>routeRolesId?.includes(role))
   return canUserPass
 }

}