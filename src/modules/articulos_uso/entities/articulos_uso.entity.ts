import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articulos_uso')
export class ArticulosUso {
  @PrimaryGeneratedColumn()
  Id_articulo: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  Stock: number;
}