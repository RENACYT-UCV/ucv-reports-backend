import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AlmacenStockDanado } from '../../almacenstockdañado/entities/almacenstockdañado.entity';

@Entity('historal_productos_dañados')
export class HistoralProductosDanados {
  @PrimaryGeneratedColumn()
  idhistorial: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.historialProductosDanados)
  @JoinColumn({ name: 'idpersonal' })
  personal: Usuario;

  @Column()
  idpersonal: number;

  @ManyToOne(() => AlmacenStockDanado)
  @JoinColumn({ name: 'idalmacen' })
  almacen: AlmacenStockDanado;

  @Column()
  idalmacen: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'int' })
  cantidad_productos_malogrados: number;
}
