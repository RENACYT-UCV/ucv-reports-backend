import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Reporte } from '../../reportes/entities/reporte.entity';

@Entity('historial_reportes')
export class HistorialReportes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.historialReportes)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Reporte, (reporte) => reporte.historialReportes)
  @JoinColumn({ name: 'reporte_id' })
  reporte: Reporte;

  @Column()
  reporte_id: number;

  @Column({ type: 'date' })
  fecha: string;
}
