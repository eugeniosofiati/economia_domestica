import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notificacoes')
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  destino: string;

  @Column()
  assunto: string;

  @Column({ type: 'longtext' })
  mensagem: string;

  @Column({ name: 'enviado_em', type: 'datetime' })
  enviado_em: Date;
}
