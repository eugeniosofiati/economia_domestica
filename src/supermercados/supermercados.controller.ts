import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SupermercadosService } from './supermercados.service';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';

@Controller('supermercados')
export class SupermercadosController {
  constructor(private readonly supermercadosService: SupermercadosService) {}

  @Post()
  create(@Body() dto: CreateSupermercadoDto) {
    return this.supermercadosService.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.supermercadosService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supermercadosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupermercadoDto,
  ) {
    return this.supermercadosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supermercadosService.remove(id);
  }
}
