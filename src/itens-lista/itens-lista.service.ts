import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemLista } from './entities/item-lista.entity';
import { CreateItemListaDto } from './dto/create-item-lista.dto';
import { UpdateItemListaDto } from './dto/update-item-lista.dto';

@Injectable()
export class ItensListaService {
  constructor(
    @InjectRepository(ItemLista)
    private readonly itemListaRepository: Repository<ItemLista>,
  ) {}

  async create(dto: CreateItemListaDto): Promise<ItemLista> {
    const item = this.itemListaRepository.create({
      ...dto,
      ativo: true,
      comprado: dto.comprado ?? false,
    });

    return this.itemListaRepository.save(item);
  }

  async findAll(status: string = 'ativos'): Promise<ItemLista[]> {
    if (status === 'inativos') {
      return this.itemListaRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.itemListaRepository.find({
        order: { id: 'DESC' },
      });
    }

    return this.itemListaRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ItemLista> {
    const item = await this.itemListaRepository.findOne({
      where: { id, ativo: true },
    });

    if (!item) {
      throw new NotFoundException(`Item da lista com ID ${id} não encontrado ou inativo.`);
    }

    return item;
  }

  async update(id: number, dto: UpdateItemListaDto): Promise<ItemLista> {
    const item = await this.findOne(id);

    Object.assign(item, dto);

    return this.itemListaRepository.save(item);
  }

  async remove(id: number): Promise<ItemLista> {
    const item = await this.findOne(id);

    item.ativo = false;

    return this.itemListaRepository.save(item);
  }
}
