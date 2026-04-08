import { IsInt, IsBoolean, IsOptional, IsString, Min } from 'class-validator';

export class CreateItemListaDto {
  @IsInt()
  @Min(1)
  id_lista: number;

  @IsInt()
  @Min(1)
  id_produto: number;

  @IsInt()
  @Min(1)
  quantidade: number;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsBoolean()
  comprado?: boolean;
}
