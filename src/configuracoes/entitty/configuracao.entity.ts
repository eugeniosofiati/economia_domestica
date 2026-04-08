import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('configuracoes_sistema')
export class Configuracao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chave: string;

  @Column()
  valor: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ name: 'atualizado_em', type: 'datetime' })
  atualizado_em: Date;
}
