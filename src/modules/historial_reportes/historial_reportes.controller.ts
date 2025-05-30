import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistorialReportesService } from './historial_reportes.service';
import { HistorialReportes } from './entities/historial_reportes.entity';

@Controller('historial-reportes')
export class HistorialReportesController {
  constructor(
    private readonly historialReportesService: HistorialReportesService,
  ) {}

  @Get(':idUsuario')
  async obtenerHistorial(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ): Promise<HistorialReportes[]> {
    return this.historialReportesService.obtenerHistorial(idUsuario);
  }

  @Get('resueltos-desaprobados')
  async obtenerReportesResueltosYDesaprobados(): Promise<any[]> {
    return this.historialReportesService.obtenerReportesResueltosYDesaprobados();
  }
}
