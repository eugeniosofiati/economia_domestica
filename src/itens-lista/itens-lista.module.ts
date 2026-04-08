import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensListaService } from './itens-lista.service';
import { ItensListaController } from './itens-lista.controller';
import { ItemLista } from './entities/item-lista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemLista])],
  controllers: [ItensListaController],
  providers: [ItensListaService],
  exports: [ItensListaService],
})
export class ItensListaModule {}