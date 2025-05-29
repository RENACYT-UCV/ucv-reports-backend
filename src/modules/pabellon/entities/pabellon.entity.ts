import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Hardware } from '../../hardware/entities/hardware.entity';
import { Piso } from '../../piso/entities/piso.entity';
import { Salon } from '../../salon/entities/salon.entity';

@Entity('pabellon')
export class Pabellon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  Pabellon: string;

  @OneToMany(() => Hardware, (hardware) => hardware.pabellon)
  hardwares: Hardware[];

  @OneToMany(() => Piso, (piso) => piso.pabellon)
  pisos: Piso[];

  @OneToMany(() => Salon, (salon) => salon.pabellon)
  salones: Salon[];
}
