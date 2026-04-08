import { IsString } from 'class-validator';

export class CreateSupermercadoDto {
  @IsString()
  nome: string;
}