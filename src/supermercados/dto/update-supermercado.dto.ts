import { PartialType } from '@nestjs/mapped-types';
import { CreateSupermercadoDto } from './create-supermercado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSupermercadoDto extends PartialType(CreateSupermercadoDto) {
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}