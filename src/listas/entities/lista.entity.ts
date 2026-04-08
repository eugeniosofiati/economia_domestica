import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Supermercado } from '../../supermercados/entities/supermercado.entity';
import { ItemLista } from '../../itens-lista/entities/item-lista.entity';

@Entity('listas')
export class Lista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'id_supermercado' })
  id_supermercado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Supermercado, supermercado => supermercado.listas, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_supermercado' })
  supermercado: Supermercado;

  @OneToMany(() => ItemLista, item => item.lista)
  itens: ItemLista[];
}
