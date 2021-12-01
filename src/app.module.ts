import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [RolesModule, DatabaseModule, AuthModule],
})
export class AppModule {}
