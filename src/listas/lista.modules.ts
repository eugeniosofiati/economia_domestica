import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListasService } from './listas.service';
import { ListasController } from './listas.controller';
import { Lista } from './entities/lista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lista])],
  controllers: [ListasController],
  providers: [ListasService],
  exports: [ListasService],
})
export class ListasModule {}