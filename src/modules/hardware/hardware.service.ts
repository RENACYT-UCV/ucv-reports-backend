import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hardware } from './entities/hardware.entity';

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware)
    private readonly hardwareRepository: Repository<Hardware>,
  ) {}

  async marcarComoHabilitado(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    hardware.Estado = 'Habilitado';
    return this.hardwareRepository.save(hardware);
  }

  async marcarComoDescompuesto(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    hardware.Estado = 'Descompuesto';
    return this.hardwareRepository.save(hardware);
  }

  async findOneById(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    return hardware;
  }

  async findAll(): Promise<Hardware[]> {
    return this.hardwareRepository.find();
  }
}
