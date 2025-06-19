import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reportesService.create(createReporteDto);
  }

  @Get()
  findAll() {
    return this.reportesService.findAll();
  }

  @Get('aprobados')
  obtenerReportesAprobados() {
    return this.reportesService.obtenerReportesAprobados();
  }

  @Get('todos-con-usuario')
  obtenerTodosReportesConUsuario() {
    return this.reportesService.obtenerTodosReportesConUsuario();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReporteDto: UpdateReporteDto) {
    return this.reportesService.update(+id, updateReporteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportesService.remove(+id);
  }

  @Patch(':id/aprobar')
  aprobar(@Param('id') id: string) {
    return this.reportesService.aprobarReporte(+id);
  }

  @Patch(':id/desaprobar')
  desaprobar(
    @Param('id', ParseIntPipe) id: number,
    @Body('motivo') motivo: string,
  ) {
    return this.reportesService.desaprobarReporte(id, motivo);
  }

  @Patch(':id/resolver')
  marcarComoResuelto(
    @Param('id', ParseIntPipe) id: number,
    @Body('motivo') motivo: string,
  ) {
    return this.reportesService.marcarComoResuelto(id, motivo);
  }

  @Get(':id')
  obtenerDetallesReporte(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.obtenerDetallesReporte(id);
  }

  @Get('detalle/:id_reporte')
  obtenerReportePorId(@Param('id_reporte', ParseIntPipe) id_reporte: number) {
    return this.reportesService.obtenerReportePorId(id_reporte);
  }

  @Get('resueltos/:usuario_id')
  obtenerReportesResueltos(
    @Param('usuario_id', ParseIntPipe) usuario_id: number,
  ) {
    return this.reportesService.obtenerReportesResueltos(usuario_id);
  }

  @Get('resueltos-personal/:id_personal')
  obtenerReportesResueltosPersonal(
    @Param('id_personal', ParseIntPipe) id_personal: number,
  ) {
    return this.reportesService.obtenerReportesResueltosPersonal(id_personal);
  }

  @Post('tomar-reporte')
  async tomarReporte(
    @Body('id_reporte', ParseIntPipe) id_reporte: number,
    @Body('id_personal', ParseIntPipe) id_personal: number,
  ) {
    await this.reportesService.tomarReporte(id_reporte, id_personal);
    return {
      message: 'Reporte tomado correctamente y registrado en historial.',
    };
  }

  @Get('buscar-usuario/:usuario')
  async buscarReportesPorUsuario(@Param('usuario') usuario: string) {
    return this.reportesService.buscarReportesPorUsuario(usuario);
  }
}
