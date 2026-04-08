import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';

@Controller('configuracoes')
export class ConfiguracoesController {
  constructor(private readonly service: ConfiguracoesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':chave')
  findOne(@Param('chave') chave: string) {
    return this.service.findOne(chave);
  }

  @Patch(':chave')
  update(@Param('chave') chave: string, @Body() dto: UpdateConfiguracaoDto) {
    return this.service.update(chave, dto);
  }
}
