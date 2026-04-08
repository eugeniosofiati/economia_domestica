import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';
import { Supermercado } from '../../supermercados/entities/supermercado.entity';

@Entity('historico_compras')
export class HistoricoCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  produto_id: number;

  @Column()
  supermercado_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'date' })
  data_compra: Date;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Produto, produto => produto.historico, { eager: true })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @ManyToOne(() => Supermercado, supermercado => supermercado.historico, { eager: true })
  @JoinColumn({ name: 'supermercado_id' })
  supermercado: Supermercado;
}
