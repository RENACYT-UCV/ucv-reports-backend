import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
  ) {}

  findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find();
  }

  async findOne(id: number): Promise<Cargo> {
    const cargo = await this.cargoRepository.findOne({
      where: { idcargo: id },
    });
    if (!cargo) {
      throw new NotFoundException(`Cargo con ID ${id} no encontrado`);
    }
    return cargo;
  }

  create(createCargoDto: CreateCargoDto): Promise<Cargo> {
    const cargo = this.cargoRepository.create(createCargoDto);
    return this.cargoRepository.save(cargo);
  }

  async update(id: number, updateCargoDto: UpdateCargoDto): Promise<Cargo> {
    await this.cargoRepository.update(id, updateCargoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cargoRepository.delete(id);
  }
}
