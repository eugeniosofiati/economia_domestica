import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacao } from './entity/notificacao.entity';
import { NotificacoesService } from './notificacoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacao])],
  providers: [NotificacoesService],
  exports: [NotificacoesService],
})
export class NotificacoesModule {}
