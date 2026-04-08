import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('uploads')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_original: string;

  @Column()
  nome_armazenado: string;

  @Column()
  caminho: string;

  @Column()
  tamanho: number;

  @Column()
  tipo: string;

  @Column({ name: 'criado_em', type: 'datetime' })
  criado_em: Date;
}
