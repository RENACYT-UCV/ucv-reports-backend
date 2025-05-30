import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { Hardware } from './entities/hardware.entity';
import { CreateHardwareDto } from './dto/create-hardware.dto';

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
}
