import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cargo } from '../../cargo/entities/cargo.entity';
import { HistoralProductosDanados } from '../../historal_productos_dañados/entities/historal_productos_dañados.entity';
import { HistorialProductosIngresados } from '../../historial_productos_ingresados/entities/historial_productos_ingresados.entity';
import { HistorialProductosPersonal } from '../../historial_productos_personal/entities/historial_productos_personal.entity';
import { HistorialReportes } from '../../historial_reportes/entities/historial_reportes.entity';
import { HistorialReportePersonal } from '../../historial_reporte_personal/entities/historial_reporte_personal.entity';
import { Reporte } from '../../reportes/entities/reporte.entity'; // Importar la entidad Reporte

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  IDUsuario: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 255 })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  usuario: string;

  @Column({ type: 'varchar', length: 255 })
  contraseña: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.usuarios)
  @JoinColumn({ name: 'id_cargo' })
  cargo: Cargo;

  @Column()
  id_cargo: number;

  @Column({ type: 'varchar', length: 255 })
  Estado: string;

  @OneToMany(() => HistoralProductosDanados, (historial) => historial.personal)
  historialProductosDanados: HistoralProductosDanados[];

  @OneToMany(
    () => HistorialProductosIngresados,
    (historial) => historial.personal,
  )
  historialProductosIngresados: HistorialProductosIngresados[];

  @OneToMany(
    () => HistorialProductosPersonal,
    (historial) => historial.personal,
  )
  historialProductosPersonal: HistorialProductosPersonal[];

  @OneToMany(() => HistorialReportes, (historial) => historial.usuario)
  historialReportes: HistorialReportes[];

  @OneToMany(() => HistorialReportePersonal, (historial) => historial.personal)
  historialReportePersonal: HistorialReportePersonal[];

  @OneToMany(() => Reporte, (reporte) => reporte.usuario) // Relación OneToMany con Reporte
  reportes: Reporte[];
}
