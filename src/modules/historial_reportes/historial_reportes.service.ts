import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialReportes } from './entities/historial_reportes.entity';
import { Reporte } from '../reportes/entities/reporte.entity';

@Injectable()
export class HistorialReportesService {
  constructor(
    @InjectRepository(HistorialReportes)
    private readonly historialReportesRepository: Repository<HistorialReportes>,
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ) {}

  async obtenerHistorial(IDUsuario: number): Promise<HistorialReportes[]> {
    const historial = await this.historialReportesRepository
      .createQueryBuilder('hr')
      .leftJoinAndSelect('hr.reporte', 'r')
      .where('hr.usuario_id = :IDUsuario', { IDUsuario })
      .andWhere("r.estado IN ('Pendiente', 'Tomado')")
      .select([
        'hr.id',
        'hr.reporte_id',
        'hr.fecha',
        'r.Pabellon',
        'r.Piso',
        'r.Salon',
        'r.descripcion',
        'r.Motivo',
      ])
      .getMany();

    return historial;
  }

  async obtenerReportesResueltosYDesaprobados(): Promise<any[]> {
    const reportes = await this.historialReportesRepository
      .createQueryBuilder('hr')
      .select([
        'r.id_reporte AS id_reporte',
        'u.usuario AS usuario',
        "CONCAT(r.Pabellon, ' ', r.Piso, ' ', r.Salon) AS lugar_problema",
        'hr.fecha AS fecha',
        'r.estado AS estado',
      ])
      .innerJoin('hr.usuario', 'u')
      .innerJoin('hr.reporte', 'r')
      .where("r.estado IN ('Resuelto', 'Desaprobado')")
      .getRawMany();

    return reportes;
  }

  async aprobarODesaprobarHistorial(
    id: number,
    estado: string,
    motivo?: string,
  ): Promise<HistorialReportes> {
    const historial = await this.historialReportesRepository.findOne({
      where: { id },
      relations: ['reporte'],
    });

    if (!historial) {
      throw new NotFoundException(
        `Historial de reporte con ID ${id} no encontrado`,
      );
    }

    if (!historial.reporte) {
      throw new NotFoundException(
        `Reporte asociado al historial con ID ${id} no encontrado`,
      );
    }

    historial.reporte.estado = estado;
    if (motivo) {
      historial.reporte.Motivo = motivo;
    }
    await this.reporteRepository.save(historial.reporte);
    return historial;
  }

  async createHistorialReporte(
    usuario_id: number,
    reporte_id: number,
  ): Promise<HistorialReportes> {
    const historialReporte = this.historialReportesRepository.create({
      usuario_id,
      reporte_id,
      fecha: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    });
    return this.historialReportesRepository.save(historialReporte);
  }
}
