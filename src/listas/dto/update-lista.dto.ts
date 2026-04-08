import { PartialType } from '@nestjs/mapped-types';
import { CreateListaDto } from './create-lista.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateListaDto extends PartialType(CreateListaDto) {
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
