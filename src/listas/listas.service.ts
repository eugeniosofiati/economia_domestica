import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lista } from './entities/lista.entity';
import { CreateListaDto } from './dto/create-lista.dto';
import { UpdateListaDto } from './dto/update-lista.dto';

@Injectable()
export class ListasService {
  constructor(
    @InjectRepository(Lista)
    private readonly listaRepository: Repository<Lista>,
  ) {}

  async create(dto: CreateListaDto): Promise<Lista> {
    const lista = this.listaRepository.create({
      ...dto,
      ativo: true,
    });

    return this.listaRepository.save(lista);
  }

  async findAll(status: string = 'ativos'): Promise<Lista[]> {
    if (status === 'inativos') {
      return this.listaRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.listaRepository.find({
        order: { id: 'DESC' },
      });
    }

    return this.listaRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Lista> {
    const lista = await this.listaRepository.findOne({
      where: { id, ativo: true },
    });

    if (!lista) {
      throw new NotFoundException(`Lista com ID ${id} não encontrada ou inativa.`);
    }

    return lista;
  }

  async update(id: number, dto: UpdateListaDto): Promise<Lista> {
    const lista = await this.findOne(id);

    Object.assign(lista, dto);

    return this.listaRepository.save(lista);
  }

  async remove(id: number): Promise<Lista> {
    const lista = await this.findOne(id);

    lista.ativo = false;

    return this.listaRepository.save(lista);
  }
}
