import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteRepository } from '../repositories/route.repository';
import { RouteEntity } from '../entities/route.entity';
import { CreateRouteDto } from '../dto/route/create-route.dto';
import { RouteQuerystring } from '../dto/route/querystring/route.querystring';
import { PaginateDto } from '../dto/paginate.dto';

@Injectable()
export class RouteService {
  constructor(@InjectRepository(RouteRepository) private readonly routeRepository:RouteRepository) {
  }

  async createRoute(createRouteDto:CreateRouteDto):Promise<RouteEntity>
  {
    return await this.routeRepository.createRoute(createRouteDto)
  }

  async getAllRoutes(paginateDto:PaginateDto):Promise<RouteQuerystring>
  {
    const {limit,page}=paginateDto
  const skip=(page-1)*limit
    const take=limit
    const getAllRoutes=await this.routeRepository.find({where:{deleted:false},skip:skip,take:take})
    const totalRoutes=await this.routeRepository.count({where:{delete:false}})
    const paginatedRoutes:RouteQuerystring={
      data:getAllRoutes,
      limit:limit,
      page:page,
      total:totalRoutes
    }
    return paginatedRoutes
  }
}