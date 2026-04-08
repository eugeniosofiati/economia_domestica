import { IsInt, IsOptional, IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  id_categoria: number;

  @IsInt()
  id_corredor: number;

  @IsOptional()
  @IsNumberString()
  preco_medio?: string;
}
