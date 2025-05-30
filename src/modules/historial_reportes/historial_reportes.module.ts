import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialReportesService } from './historial_reportes.service';
import { HistorialReportesController } from './historial_reportes.controller';
import { HistorialReportes } from './entities/historial_reportes.entity';
import { Reporte } from '../reportes/entities/reporte.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialReportes, Reporte, Usuario])],
  providers: [HistorialReportesService],
  controllers: [HistorialReportesController],
  exports: [HistorialReportesService],
})
export class HistorialReportesModule {}
