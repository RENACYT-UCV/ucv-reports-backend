import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salon } from './entities/salon.entity';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(Salon)
    private readonly salonRepository: Repository<Salon>,
  ) {}

  async findByPiso(id_piso: number): Promise<Salon[]> {
    return this.salonRepository.find({ where: { idpiso: id_piso } });
  }

  async findAll(): Promise<Salon[]> {
    return this.salonRepository.find();
  }
}
