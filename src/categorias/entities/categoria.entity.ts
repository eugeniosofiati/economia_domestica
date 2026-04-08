import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'ativo', default: true })
  ativo: boolean;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos: Produto[];
}
