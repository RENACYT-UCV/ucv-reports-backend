import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Piso } from '../../piso/entities/piso.entity';
import { Pabellon } from '../../pabellon/entities/pabellon.entity';
import { Hardware } from '../../hardware/entities/hardware.entity';

@Entity('salon')
export class Salon {
  @PrimaryGeneratedColumn()
  id_salon: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @ManyToOne(() => Piso, (piso) => piso.salones)
  @JoinColumn({ name: 'idpiso' })
  piso: Piso;

  @Column()
  idpiso: number;

  @ManyToOne(() => Pabellon, (pabellon) => pabellon.salones)
  @JoinColumn({ name: 'idpabellon' })
  pabellon: Pabellon;

  @Column()
  idpabellon: number;

  @OneToMany(() => Hardware, (hardware) => hardware.salon)
  hardwares: Hardware[];
}
