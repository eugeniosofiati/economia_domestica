import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermercado } from './entities/supermercado.entity';
import { CreateSupermercadoDto } from './dto/create-supermercado.dto';
import { UpdateSupermercadoDto } from './dto/update-supermercado.dto';

@Injectable()
export class SupermercadosService {
  constructor(
    @InjectRepository(Supermercado)
    private readonly supermercadoRepository: Repository<Supermercado>,
  ) {}

  async create(dto: CreateSupermercadoDto): Promise<Supermercado> {
    const supermercado = this.supermercadoRepository.create({
      ...dto,
      ativo: true,
    });

    return this.supermercadoRepository.save(supermercado);
  }

  async findAll(status: string = 'ativos'): Promise<Supermercado[]> {
    if (status === 'inativos') {
      return this.supermercadoRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.supermercadoRepository.find({
        order: { id: 'DESC' },
      });
    }

    return this.supermercadoRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Supermercado> {
    const supermercado = await this.supermercadoRepository.findOne({
      where: { id, ativo: true },
    });

    if (!supermercado) {
      throw new NotFoundException(`Supermercado com ID ${id} não encontrado ou inativo.`);
    }

    return supermercado;
  }

  async update(id: number, dto: UpdateSupermercadoDto): Promise<Supermercado> {
    const supermercado = await this.findOne(id);

    Object.assign(supermercado, dto);

    return this.supermercadoRepository.save(supermercado);
  }

  async remove(id: number): Promise<Supermercado> {
    const supermercado = await this.findOne(id);

    supermercado.ativo = false;

    return this.supermercadoRepository.save(supermercado);
  }
}
