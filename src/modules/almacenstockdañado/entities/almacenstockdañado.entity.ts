import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('almacenstockdañado')
export class AlmacenStockDanado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  stocks: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagenproducto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  compra: string;
}