import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadosService } from './supermercados.service';
import { SupermercadosController } from './supermercados.controller';
import { Supermercado } from './entities/supermercado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercado])],
  controllers: [SupermercadosController],
  providers: [SupermercadosService],
  exports: [SupermercadosService],
})
export class SupermercadosModule {}
