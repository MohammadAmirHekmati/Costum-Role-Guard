import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfiguration } from './postgres.configuration';

@Module({
  imports:[TypeOrmModule.forRootAsync({useClass:PostgresConfiguration})]
})
export class DatabaseModule {}
