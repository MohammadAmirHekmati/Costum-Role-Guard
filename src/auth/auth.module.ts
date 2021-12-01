import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import {JwtModule} from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { RoleRepository } from '../roles/repositories/role.repository';
import { RoleGuard } from './guards/role.guard';
import { RouteRepository } from '../roles/repositories/route.repository';
@Module({
  imports:[TypeOrmModule.forFeature([UserRepository,RoleRepository,RouteRepository]),
  JwtModule.register({
    secret:'11538832',
    signOptions:{
      expiresIn:'3600s'
    }
  })
  ],
  providers:[JwtModule,JwtStrategy,AuthService,RoleGuard],
  controllers:[AuthController]
})
export class AuthModule {}
