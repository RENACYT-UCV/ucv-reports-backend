import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,
  ) {}

  create(createReporteDto: CreateReporteDto) {
    const reporte = this.reporteRepository.create(createReporteDto);
    return this.reporteRepository.save(reporte);
  }

  findAll() {
    return this.reporteRepository.find();
  }

  findOne(id: number) {
    return this.reporteRepository.findOneBy({ id_reporte: id });
  }

  async update(id: number, updateReporteDto: UpdateReporteDto) {
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) return null;

    this.reporteRepository.merge(reporte, updateReporteDto);
    return this.reporteRepository.save(reporte);
  }

  async remove(id: number) {
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) return null;

    return this.reporteRepository.remove(reporte);
  }

  async aprobarReporte(id: number) {
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) return null;

    reporte.estado = 'Aprobado';
    return this.reporteRepository.save(reporte);
  }

  async desaprobarReporte(id: number, motivo: string) {
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) return null;

    reporte.estado = 'Desaprobado';
    reporte.Motivo = motivo;
    return this.reporteRepository.save(reporte);
  }
}
