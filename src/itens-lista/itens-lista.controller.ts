import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ItensListaService } from './itens-lista.service';
import { CreateItemListaDto } from './dto/create-item-lista.dto';
import { UpdateItemListaDto } from './dto/update-item-lista.dto';

@Controller('itens-lista')
export class ItensListaController {
  constructor(private readonly itensListaService: ItensListaService) {}

  @Post()
  create(@Body() dto: CreateItemListaDto) {
    return this.itensListaService.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.itensListaService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itensListaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemListaDto,
  ) {
    return this.itensListaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itensListaService.remove(id);
  }
}