import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Pabellon } from '../../pabellon/entities/pabellon.entity';
import { Hardware } from '../../hardware/entities/hardware.entity';
import { Salon } from '../../salon/entities/salon.entity';

@Entity('piso')
export class Piso {
  @PrimaryGeneratedColumn()
  id_piso: number;

  @Column({ type: 'int' })
  numero_piso: number;

  @ManyToOne(() => Pabellon, (pabellon) => pabellon.pisos)
  @JoinColumn({ name: 'idpabellon' })
  pabellon: Pabellon;

  @Column()
  idpabellon: number;

  @OneToMany(() => Hardware, (hardware) => hardware.piso)
  hardwares: Hardware[];

  @OneToMany(() => Salon, (salon) => salon.piso)
  salones: Salon[];
}
