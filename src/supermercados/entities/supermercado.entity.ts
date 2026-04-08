import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lista } from '../../listas/entities/lista.entity';
import { Corredor } from '../../corredores/entities/corredor.entity';

@Entity('supermercados')
export class Supermercado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Lista, lista => lista.supermercado)
  listas: Lista[];

  @OneToMany(() => Corredor, corredor => corredor.supermercado)
  corredores: Corredor[];
}
