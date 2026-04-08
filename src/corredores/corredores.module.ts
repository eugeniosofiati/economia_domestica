import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorredoresService } from './corredores.service';
import { CorredoresController } from './corredores.controller';
import { Corredor } from './entities/corredor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corredor])],
  controllers: [CorredoresController],
  providers: [CorredoresService],
  exports: [CorredoresService],
})
export class CorredoresModule {}