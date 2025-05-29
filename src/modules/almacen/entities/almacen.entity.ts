import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('almacen')
export class Almacen {
  @PrimaryGeneratedColumn()
  id_almacen: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagenproducto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Compra: string;
}