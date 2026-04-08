import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permissoes')
export class Permissao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chave: string;
}
