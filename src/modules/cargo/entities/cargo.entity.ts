import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('cargo')
export class Cargo {
  @PrimaryGeneratedColumn()
  idcargo: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];
}
