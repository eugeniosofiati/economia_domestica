import { IsOptional, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class UpdateHistoricoCompraDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  preco?: number;

  @IsOptional()
  @IsDateString()
  data_compra?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
