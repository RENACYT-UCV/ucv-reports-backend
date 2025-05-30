import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../../config/database.config';
import { envConfig } from '../../config/env.config';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PisoModule } from '../piso/piso.module';
import { ReportesModule } from '../reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UsuariosModule,
    PisoModule,
    ReportesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
