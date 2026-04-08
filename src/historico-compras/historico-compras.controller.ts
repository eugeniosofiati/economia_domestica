import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { HistoricoComprasService } from './historico-compras.service';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';

@Controller('historico-compras')
export class HistoricoComprasController {
  constructor(private readonly service: HistoricoComprasService) {}

  @Post()
  create(@Body() dto: CreateHistoricoCompraDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.service.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHistoricoCompraDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDelete(id);
  }
}
