import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reporte } from '../../reportes/entities/reporte.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('historial_reporte_personal')
export class HistorialReportePersonal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reporte, (reporte) => reporte.historialReportePersonal)
  @JoinColumn({ name: 'id_reporte' })
  reporte: Reporte;

  @Column()
  id_reporte: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.historialReportePersonal)
  @JoinColumn({ name: 'id_personal' })
  personal: Usuario;

  @Column()
  id_personal: number;

  @Column({ type: 'date' })
  fecha: string;
}
