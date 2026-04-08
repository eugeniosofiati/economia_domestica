import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CorredoresService } from './corredores.service';
import { CreateCorredorDto } from './dto/create-corredor.dto';
import { UpdateCorredorDto } from './dto/update-corredor.dto';

@Controller('corredores')
export class CorredoresController {
  constructor(private readonly corredoresService: CorredoresService) {}

  @Post()
  create(@Body() dto: CreateCorredorDto) {
    return this.corredoresService.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.corredoresService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.corredoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCorredorDto,
  ) {
    return this.corredoresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.corredoresService.remove(id);
  }
}