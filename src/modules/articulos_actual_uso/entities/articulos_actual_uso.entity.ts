import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articulos_actual_uso')
export class ArticulosActualUso {
  @PrimaryGeneratedColumn()
  id_articulo: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  LinkCompra: string;
}