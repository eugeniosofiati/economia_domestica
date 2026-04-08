import { IsInt, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateHistoricoCompraDto {
  @IsInt()
  produto_id: number;

  @IsInt()
  supermercado_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  preco: number;

  @IsDateString()
  data_compra: string;
}
