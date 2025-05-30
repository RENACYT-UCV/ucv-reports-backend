import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
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
  async desaprobar(@Param('id') id: number, @Body('motivo') motivo: string) {
    const reporte = await this.reportesService.desaprobarReporte(id, motivo);
    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }
    return { message: 'Reporte desaprobado exitosamente', reporte };
  }

  @Get(':id')
  async obtenerDetallesReporte(@Param('id') id: number) {
    const reporte = await this.reportesService.obtenerDetallesReporte(id);
    return reporte;
  }
  }