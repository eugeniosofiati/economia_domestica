import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entity/usuario.entity';

@Entity('tokens_refresh')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column()
  token: string;

  @Column({ type: 'datetime' })
  expiracao: Date;

  @Column({ default: true })
  valido: boolean;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
