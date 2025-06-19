import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
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

  @Patch(':id/estado')
  async aprobarODesaprobarHistorial(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: string,
    @Body('motivo') motivo?: string,
  ): Promise<HistorialReportes> {
    return this.historialReportesService.aprobarODesaprobarHistorial(
      id,
      estado,
      motivo,
    );
  }

  @Post('/add')
  async createHistorialReporte(
    @Body('usuario_id', ParseIntPipe) usuario_id: number,
    @Body('reporte_id', ParseIntPipe) reporte_id: number,
  ): Promise<HistorialReportes> {
    return this.historialReportesService.createHistorialReporte(
      usuario_id,
      reporte_id,
    );
  }
}
