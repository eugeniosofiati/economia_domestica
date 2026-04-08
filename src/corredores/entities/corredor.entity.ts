import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Supermercado } from '../../supermercados/entities/supermercado.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('corredores')
export class Corredor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'id_supermercado' })
  id_supermercado: number;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Supermercado, supermercado => supermercado.corredores, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_supermercado' })
  supermercado: Supermercado;

  @OneToMany(() => Produto, produto => produto.corredor)
  produtos: Produto[];
}
