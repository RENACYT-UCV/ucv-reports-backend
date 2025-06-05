import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../../config/database.config';
import { envConfig } from '../../config/env.config';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PisoModule } from '../piso/piso.module';
import { ReportesModule } from '../reportes/reportes.module';
import { HardwareModule } from '../hardware/hardware.module';
import { PabellonModule } from '../pabellon/pabellon.module';
import { SalonModule } from '../salon/salon.module';
import { AuthModule } from '../auth/auth.module';
import { CargoModule } from '../cargo/cargo.module';
import { HistorialReportesModule } from '../historial_reportes/historial_reportes.module';
import { GoogleDriveModule } from '../google-drive/google-drive.module';
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
    ReportesModule,
    HardwareModule,
    PabellonModule,
    SalonModule,
    AuthModule,
    CargoModule,
    HistorialReportesModule,
    GoogleDriveModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
