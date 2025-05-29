import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articulos')
export class Articulo {
  @PrimaryGeneratedColumn()
  id_articulo: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  puntaje: number;
}