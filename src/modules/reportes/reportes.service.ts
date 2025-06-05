import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { HistorialReportes } from '../historial_reportes/entities/historial_reportes.entity';
import { HistorialReportePersonal } from '../historial_reporte_personal/entities/historial_reporte_personal.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,
    @InjectRepository(HistorialReportes)
    private historialReportesRepository: Repository<HistorialReportes>,
    @InjectRepository(HistorialReportePersonal)
    private historialReportePersonalRepository: Repository<HistorialReportePersonal>,
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

  async desaprobarReporte(id: number, motivo: string): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOne({
      where: { id_reporte: id },
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }

    reporte.estado = 'Desaprobado';
    reporte.Motivo = motivo;
    return this.reporteRepository.save(reporte);
  }

  async marcarComoResuelto(id: number, motivo: string): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOne({
      where: { id_reporte: id },
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }

    reporte.estado = 'Resuelto';
    reporte.Motivo = motivo;
    return this.reporteRepository.save(reporte);
  }

  async obtenerDetallesReporte(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOne({
      where: { id_reporte: id },
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }

    return reporte;
  }

  async obtenerReportePorId(id_reporte: number): Promise<any> {
    const reporte = await this.reporteRepository
      .createQueryBuilder('r')
      .select([
        'r.facultad',
        'r.turno',
        'r.Pabellon',
        'r.evidencia',
        'r.descripcion',
        'r.fecha',
        'r.estado',
        'r.Piso',
        'r.Salon',
        'r.Articulos',
        'r.googleDriveFileId',
      ])
      .where('r.id_reporte = :id_reporte', { id_reporte })
      .getRawOne();

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id_reporte} no encontrado`);
    }

    return {
      facultad: reporte.r_facultad,
      turno: reporte.r_turno,
      Pabellon: reporte.r_Pabellon,
      evidencia: reporte.r_evidencia,
      descripcion: reporte.r_descripcion,
      fecha: reporte.r_fecha,
      estado: reporte.r_estado,
      Piso: reporte.r_Piso,
      Salon: reporte.r_Salon,
      Articulos: reporte.r_Articulos,
      googleDriveFileId: reporte.r_googleDriveFileId,
    };
  }

  async obtenerReportesResueltos(usuario_id: number): Promise<any[]> {
    const reportes = await this.reporteRepository
      .createQueryBuilder('r')
      .select([
        'r.id_reporte',
        'r.Pabellon',
        'r.Piso',
        'r.Salon',
        'r.fecha',
        'r.descripcion',
        'r.estado',
        'r.Motivo',
      ])
      .innerJoin(HistorialReportes, 'hr', 'r.id_reporte = hr.reporte_id')
      .where('r.estado IN (:...estados)', {
        estados: ['Resuelto', 'Desaprobado'],
      })
      .andWhere('hr.usuario_id = :usuario_id', { usuario_id })
      .orderBy('r.fecha', 'DESC')
      .getRawMany();

    return reportes.map((reporte) => ({
      id_reporte: reporte.r_id_reporte,
      lugar_problema: `${reporte.r_Pabellon}, ${reporte.r_Piso}, ${reporte.r_Salon}`,
      fecha: reporte.r_fecha,
      descripcion: reporte.r_descripcion,
      estado: reporte.r_estado,
      Motivo: reporte.r_Motivo,
    }));
  }

  async obtenerReportesAprobados(): Promise<any[]> {
    const reportes = await this.reporteRepository
      .createQueryBuilder('r')
      .select([
        'r.id_reporte',
        "CONCAT(r.Pabellon, ', ', r.Piso, ', ', r.Salon) AS lugar_problema",
        'r.fecha',
        'r.descripcion',
        'r.Articulos',
      ])
      .where("r.estado = 'Aprobado'")
      .orderBy(
        `CASE
          WHEN r.Articulos = 'Hardware' THEN 1
          WHEN r.Articulos = 'Tecnológicos' THEN 2
          WHEN r.Articulos = 'Escritorios' THEN 3
          WHEN r.Articulos = 'Otros' THEN 4
          ELSE 5
        END`,
      )
      .getRawMany();

    return reportes || [];
  }

  async obtenerReportesResueltosPersonal(id_personal: number): Promise<any[]> {
    const reportes = await this.reporteRepository
      .createQueryBuilder('r')
      .select([
        'r.id_reporte',
        "CONCAT(r.Pabellon, ', ', r.Piso, ', ', r.Salon) AS lugar_problema",
        'r.fecha',
        'r.descripcion',
        'r.Articulos',
      ])
      .innerJoin(
        'HistorialReportePersonal',
        'hrp',
        'r.id_reporte = hrp.id_reporte',
      )
      .where("r.estado = 'Resuelto'")
      .andWhere('hrp.id_personal = :id_personal', { id_personal })
      .orderBy('r.fecha', 'DESC')
      .getRawMany();

    return reportes || [];
  }

  async obtenerTodosReportesConUsuario(): Promise<any[]> {
    const reportes = await this.historialReportesRepository
      .createQueryBuilder('hr')
      .select([
        'hr.id AS historial_id',
        'r.id_reporte',
        'u.usuario',
        "CONCAT(r.Pabellon, ' ', r.Piso, ' ', r.Salon) AS lugar_problema",
        'r.fecha',
        'r.estado',
      ])
      .innerJoin('hr.reporte', 'r')
      .innerJoin('hr.usuario', 'u')

      .getRawMany();

    return reportes.map((reporte) => ({
      historial_id: reporte.historial_id,
      id_reporte: reporte.r_id_reporte,
      usuario: reporte.u_usuario,
      lugar_problema: reporte.lugar_problema,
      fecha: reporte.r_fecha,
      estado: reporte.r_estado,
    }));
  }

  async tomarReporte(id_reporte: number, id_personal: number): Promise<void> {
    return this.reporteRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const reporte = await transactionalEntityManager.findOne(Reporte, {
          where: { id_reporte },
        });
        if (!reporte) {
          throw new NotFoundException(
            `Reporte con ID ${id_reporte} no encontrado`,
          );
        }

        reporte.estado = 'Tomado';
        await transactionalEntityManager.save(reporte);

        const historialPersonal = transactionalEntityManager.create(
          HistorialReportePersonal,
          {
            id_reporte,
            id_personal,
            fecha: new Date().toISOString().split('T')[0],
          },
        );
        await transactionalEntityManager.save(historialPersonal);
      },
    );
  }

  async buscarReportesPorUsuario(usuario: string): Promise<any[]> {
    const reportes = await this.reporteRepository
      .createQueryBuilder('reporte')
      .innerJoin('reporte.usuario', 'usuario') // Asumiendo que hay una relación 'usuario' en la entidad Reporte
      .where('LOWER(usuario.usuario) LIKE LOWER(:usuario)', {
        usuario: `%${usuario}%`,
      })
      .getMany();

    return reportes;
  }
}
