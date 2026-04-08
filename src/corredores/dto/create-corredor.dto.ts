import { IsInt, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCorredorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsPositive()
  id_supermercado: number;
}
