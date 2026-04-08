import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateListaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @Min(1)
  id_supermercado: number;
}
