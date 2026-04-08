import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Corredor } from '../../corredores/entities/corredor.entity';
import { ItemLista } from '../../itens-lista/entities/item-lista.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'id_categoria' })
  id_categoria: number;

  @Column({ name: 'id_corredor' })
  id_corredor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  preco_medio: string;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @ManyToOne(() => Corredor, corredor => corredor.produtos, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_corredor' })
  corredor: Corredor;

  @OneToMany(() => ItemLista, item => item.produto)
  itens: ItemLista[];
}
