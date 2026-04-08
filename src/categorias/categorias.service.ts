import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create({
      ...dto,
      ativo: true,
    });

    return this.categoriaRepository.save(categoria);
  }

  async findAll(status: string = 'ativos'): Promise<Categoria[]> {
    if (status === 'inativos') {
      return this.categoriaRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.categoriaRepository.find({
        order: { id: 'DESC' },
      });
    }

    // padrão: somente ativos
    return this.categoriaRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id, ativo: true },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada ou inativa.`);
    }

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);

    Object.assign(categoria, dto);

    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);

    categoria.ativo = false;

    await this.categoriaRepository.save(categoria);
  }
}