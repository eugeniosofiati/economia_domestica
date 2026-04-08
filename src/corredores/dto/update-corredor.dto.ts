import { PartialType } from '@nestjs/mapped-types';
import { CreateCorredorDto } from './create-corredor.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCorredorDto extends PartialType(CreateCorredorDto) {
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
