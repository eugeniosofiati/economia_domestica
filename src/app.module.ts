import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CategoriasModule } from './categorias/categorias.module';
import { SupermercadosModule } from './supermercados/supermercados.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CorredoresModule } from './corredores/corredores.module';
import { ListasModule } from './listas/listas.module';
import { ItensListaModule } from './itens-lista/itens-lista.module';
import { HistoricoComprasModule } from './historico-compras/historico-compras.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { LogsModule } from './logs/logs.module';
import { RbacModule } from './rbac/rbac.module';
import { UploadsModule } from './uploads/uploads.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

@Module({
  imports: [
    // Carrega o .env automaticamente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexão com o banco usando variáveis do .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),

    CategoriasModule,
    SupermercadosModule,
    ProdutosModule,
    CorredoresModule,
    ListasModule,
    ItensListaModule,
    HistoricoComprasModule,
    AuditoriaModule,
    LogsModule,
    RbacModule,
    UploadsModule,
    NotificacoesModule,
  ],
})
export class AppModule {}
