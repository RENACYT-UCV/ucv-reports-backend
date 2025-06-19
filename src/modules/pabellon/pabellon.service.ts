import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pabellon } from './entities/pabellon.entity';
import { CreatePabellonDto } from './dto/create-pabellon.dto';
import { UpdatePabellonDto } from './dto/update-pabellon.dto';

@Injectable()
export class PabellonService {
  constructor(
    @InjectRepository(Pabellon)
    private readonly pabellonRepository: Repository<Pabellon>,
  ) {}

  async create(createPabellonDto: CreatePabellonDto): Promise<Pabellon> {
    const pabellon = this.pabellonRepository.create(createPabellonDto);
    return this.pabellonRepository.save(pabellon);
  }

  async findAll(): Promise<Pabellon[]> {
    return this.pabellonRepository.find();
  }

  async findOne(id: number): Promise<Pabellon> {
    const pabellon = await this.pabellonRepository.findOne({ where: { id } });
    if (!pabellon) {
      throw new NotFoundException(`Pabellon con ID ${id} no encontrado`);
    }
    return pabellon;
  }

  async update(
    id: number,
    updatePabellonDto: UpdatePabellonDto,
  ): Promise<Pabellon> {
    const pabellon = await this.findOne(id);
    Object.assign(pabellon, updatePabellonDto);
    return this.pabellonRepository.save(pabellon);
  }

  async remove(id: number): Promise<void> {
    const pabellon = await this.findOne(id);
    await this.pabellonRepository.remove(pabellon);
  }
}
