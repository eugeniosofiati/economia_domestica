import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ListasService } from './listas.service';
import { CreateListaDto } from './dto/create-lista.dto';
import { UpdateListaDto } from './dto/update-lista.dto';

@Controller('listas')
export class ListasController {
  constructor(private readonly listasService: ListasService) {}

  @Post()
  create(@Body() dto: CreateListaDto) {
    return this.listasService.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.listasService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateListaDto,
  ) {
    return this.listasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listasService.remove(id);
  }
}