import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { Hardware } from './entities/hardware.entity';

@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

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
}
