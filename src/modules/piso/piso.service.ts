import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piso } from './entities/piso.entity';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';

@Injectable()
export class PisoService {
  constructor(
    @InjectRepository(Piso)
    private readonly pisoRepository: Repository<Piso>,
  ) {}

  async create(createPisoDto: CreatePisoDto): Promise<Piso> {
    const piso = this.pisoRepository.create(createPisoDto);
    return this.pisoRepository.save(piso);
  }

  async findAll(): Promise<Piso[]> {
    return this.pisoRepository.find();
  }

  async findOne(id: number): Promise<Piso> {
    const piso = await this.pisoRepository.findOne({ where: { id_piso: id } });
    if (!piso) {
      throw new NotFoundException(`Piso con ID ${id} no encontrado`);
    }
    return piso;
  }

  async update(id: number, updatePisoDto: UpdatePisoDto): Promise<Piso> {
    const piso = await this.findOne(id);
    this.pisoRepository.merge(piso, updatePisoDto);
    return this.pisoRepository.save(piso);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pisoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Piso con ID ${id} no encontrado`);
    }
  }

  async findByPabellon(idPabellon: number): Promise<Piso[]> {
    return this.pisoRepository.find({ where: { idpabellon: idPabellon } });
  }
}
