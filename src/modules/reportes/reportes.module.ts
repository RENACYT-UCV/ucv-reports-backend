import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Reporte } from './entities/reporte.entity';
import { HistorialReportes } from '../historial_reportes/entities/historial_reportes.entity';
import { HistorialReportePersonal } from '../historial_reporte_personal/entities/historial_reporte_personal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reporte,
      HistorialReportes,
      HistorialReportePersonal,
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
  exports: [ReportesService],
})
export class ReportesModule {}
