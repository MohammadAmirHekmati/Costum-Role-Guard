import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RouteService } from '../services/route.service';
import { CreateRouteDto } from '../dto/route/create-route.dto';
import { RouteEntity } from '../entities/route.entity';
import { PaginateDto } from '../dto/paginate.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService:RouteService) {
  }

  @Post('create')
  async createRoute(@Body() createRouteDto:CreateRouteDto):Promise<any>
  {
    return await this.routeService.createRoute(createRouteDto)
  }

  @Get('getall')
  async getAllRoutesPaginate(@Query() paginateDto:PaginateDto):Promise<any>
  {
    return await this.routeService.getAllRoutes(paginateDto)
  }

}