import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistorialReportes } from '../../modules/historial_reportes/entities/historial_reportes.entity';
import { HistorialReportePersonal } from '../../modules/historial_reporte_personal/entities/historial_reporte_personal.entity';

@Entity('reportes')
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facultad: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  turno: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Pabellon: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evidencia: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'varchar', length: 255 })
  estado: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Piso: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Salon: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Articulos: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Motivo: string;

  @OneToMany(() => HistorialReportes, (historial) => historial.reporte)
  historialReportes: HistorialReportes[];

  @OneToMany(() => HistorialReportePersonal, (historial) => historial.reporte)
  historialReportePersonal: HistorialReportePersonal[];
}
