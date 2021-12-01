import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RouteController } from './controllers/route.controller';
import { RoleService } from './services/role.service';
import { RouteService } from './services/route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories/role.repository';
import { RouteRepository } from './repositories/route.repository';

@Module({
  imports:[TypeOrmModule.forFeature([RoleRepository,RouteRepository])],
  controllers:[RoleController,RouteController],
  providers:[RoleService,RouteService]
})
export class RolesModule {}
