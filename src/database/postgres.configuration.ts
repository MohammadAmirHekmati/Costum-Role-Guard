import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class PostgresConfiguration implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const postgresOptions:TypeOrmModuleOptions={
      type:'postgres',
      username:'postgres',
      password:'11538832',
      host:'localhost',
      port:5433,
      synchronize:true,
      database:'smartcontract',
      autoLoadEntities:true
    }
    return postgresOptions
  }

}