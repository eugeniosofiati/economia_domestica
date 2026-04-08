import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateConfiguracaoDto {
  @IsString()
  @IsNotEmpty()
  valor: string;
}
