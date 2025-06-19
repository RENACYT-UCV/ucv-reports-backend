import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pabellon } from '../../pabellon/entities/pabellon.entity';
import { Piso } from '../../piso/entities/piso.entity';
import { Salon } from '../../salon/entities/salon.entity';
import { ArticulosActualUso } from '../../articulos_actual_uso/entities/articulos_actual_uso.entity';

@Entity('hardware')
export class Hardware {
  @PrimaryGeneratedColumn()
  id_hardware: number;

  @Column({ type: 'varchar', length: 255 })
  Codigo: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ default: 'Habilitado', type: 'varchar', length: 255 })
  Estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Precio: number;

  @ManyToOne(() => Pabellon, (pabellon) => pabellon.hardwares)
  @JoinColumn({ name: 'idpabellon' })
  pabellon: Pabellon;

  @Column()
  idpabellon: number;

  @ManyToOne(() => Piso, (piso) => piso.hardwares)
  @JoinColumn({ name: 'idpiso' })
  piso: Piso;

  @Column()
  idpiso: number;

  @ManyToOne(() => Salon, (salon) => salon.hardwares)
  @JoinColumn({ name: 'idsalon' })
  salon: Salon;

  @Column()
  idsalon: number;

  @ManyToOne(() => ArticulosActualUso)
  @JoinColumn({ name: 'idarticulostipo' })
  articulosTipo: ArticulosActualUso;

  @Column()
  idarticulostipo: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;
}
