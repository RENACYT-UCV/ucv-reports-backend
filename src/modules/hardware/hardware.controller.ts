import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { Hardware } from './entities/hardware.entity';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareLocationDto } from './dto/update-hardware.dto';
import { CreateMultipleHardwareDto } from './dto/create-hardware.dto';

@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Get('entrada-productos')
  async obtenerEntradaProductos() {
    return this.hardwareService.obtenerEntradaProductos();
  }

  @Get(':id')
  async getHardwareById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Hardware> {
    return this.hardwareService.findOneById(id);
  }

  @Get()
  async getAllHardware(): Promise<Hardware[]> {
    return this.hardwareService.findAll();
  }

  @Post()
  async createHardware(
    @Body() createHardwareDto: CreateHardwareDto,
  ): Promise<Hardware> {
    return this.hardwareService.create(createHardwareDto);
  }

  @Patch(':id/habilitar')
  async marcarComoHabilitado(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Hardware> {
    return this.hardwareService.marcarComoHabilitado(id);
  }

  @Patch(':id/descomponer')
  async marcarComoDescompuesto(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Hardware> {
    return this.hardwareService.marcarComoDescompuesto(id);
  }

  @Put(':id/ubicacion')
  async actualizarUbicacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHardwareLocationDto: UpdateHardwareLocationDto,
  ): Promise<Hardware> {
    return this.hardwareService.actualizarUbicacion(
      id,
      updateHardwareLocationDto,
    );
  }

  @Post('multiple')
  async createMultipleHardware(
    @Body() createMultipleHardwareDto: CreateMultipleHardwareDto,
  ): Promise<Hardware[]> {
    return this.hardwareService.createMultiple(createMultipleHardwareDto);
  }

  @Get('latest-code/:id_articulo')
  async getLatestCode(
    @Param('id_articulo', ParseIntPipe) id_articulo: number,
  ): Promise<{ codigo: string }> {
    return this.hardwareService.getLatestCode(id_articulo);
  }

  @Get('descompuesto/:idArticuloTipo')
  async mostrarTablaArticulos(
    @Param('idArticuloTipo', ParseIntPipe) idArticuloTipo: number,
  ): Promise<Hardware[]> {
    return this.hardwareService.mostrarTablaArticulos(idArticuloTipo);
  }
}
