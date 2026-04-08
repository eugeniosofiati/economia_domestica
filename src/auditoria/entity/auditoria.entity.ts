import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auditoria')
export class Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_usuario: number;

  @Column()
  rota: string;

  @Column()
  metodo: string;

  @Column({ type: 'longtext', nullable: true })
  corpo: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ name: 'criado_em', type: 'datetime' })
  criado_em: Date;
}
