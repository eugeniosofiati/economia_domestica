import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lista } from '../../listas/entities/lista.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('itens_lista')
export class ItemLista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_lista' })
  id_lista: number;

  @Column({ name: 'id_produto' })
  id_produto: number;

  @Column({ default: 1 })
  quantidade: number;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @Column({ default: false })
  comprado: boolean;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Lista, lista => lista.itens, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_lista' })
  lista: Lista;

  @ManyToOne(() => Produto, produto => produto.itens, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
