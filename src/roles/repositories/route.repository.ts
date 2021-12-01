import { EntityRepository, Repository } from 'typeorm';
import { RouteEntity } from '../entities/route.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRouteDto } from '../dto/route/create-route.dto';

@Injectable()
@EntityRepository(RouteEntity)
export class RouteRepository extends Repository<RouteEntity>{

  async createRoute(createRouteDto:CreateRouteDto):Promise<RouteEntity>
  {
    const duplicate_route=await this.findOne({where:{address:createRouteDto.address,deleted:true}})
    if (duplicate_route)
      throw new ConflictException()

    const route=new RouteEntity()
    route.address=createRouteDto.address
    route.method=createRouteDto.method
    route.body=createRouteDto.body
    route.param=createRouteDto.param
    const saved_route=await this.save(route)
    return saved_route

  }

}