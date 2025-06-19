import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HistorialReportes } from '../../historial_reportes/entities/historial_reportes.entity';
import { HistorialReportePersonal } from '../../historial_reporte_personal/entities/historial_reporte_personal.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity'; // Importar la entidad Usuario

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

  @Column({ default: 'Pendiente', type: 'varchar', length: 255 })
  estado: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Piso: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Salon: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Articulos: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Motivo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  googleDriveFileId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.reportes) // Relación ManyToOne con Usuario
  usuario: Usuario;

  @Column({ nullable: true }) // Columna para la clave foránea del usuario
  usuarioId: number;

  @OneToMany(() => HistorialReportes, (historial) => historial.reporte)
  historialReportes: HistorialReportes[];

  @OneToMany(() => HistorialReportePersonal, (historial) => historial.reporte)
  historialReportePersonal: HistorialReportePersonal[];
}
