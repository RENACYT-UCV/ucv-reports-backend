import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Almacen } from '../../almacen/entities/almacen.entity';

@Entity('historial_productos_ingresados')
export class HistorialProductosIngresados {
  @PrimaryGeneratedColumn()
  idhistorial: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.historialProductosIngresados)
  @JoinColumn({ name: 'idpersonal' })
  personal: Usuario;

  @Column()
  idpersonal: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'idalmacen' })
  almacen: Almacen;

  @Column()
  idalmacen: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'int' })
  cantidad_productos_aumentados: number;
}
