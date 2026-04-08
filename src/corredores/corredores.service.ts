import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Corredor } from './entities/corredor.entity';
import { CreateCorredorDto } from './dto/create-corredor.dto';
import { UpdateCorredorDto } from './dto/update-corredor.dto';

@Injectable()
export class CorredoresService {
  constructor(
    @InjectRepository(Corredor)
    private readonly corredorRepository: Repository<Corredor>,
  ) {}

  async create(dto: CreateCorredorDto): Promise<Corredor> {
    const corredor = this.corredorRepository.create({
      ...dto,
      ativo: true,
    });

    return this.corredorRepository.save(corredor);
  }

  async findAll(status: string = 'ativos'): Promise<Corredor[]> {
    if (status === 'inativos') {
      return this.corredorRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.corredorRepository.find({
        order: { id: 'DESC' },
      });
    }

    return this.corredorRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Corredor> {
    const corredor = await this.corredorRepository.findOne({
      where: { id, ativo: true },
    });

    if (!corredor) {
      throw new NotFoundException(`Corredor com ID ${id} não encontrado ou inativo.`);
    }

    return corredor;
  }

  async update(id: number, dto: UpdateCorredorDto): Promise<Corredor> {
    const corredor = await this.findOne(id);

    Object.assign(corredor, dto);

    return this.corredorRepository.save(corredor);
  }

  async remove(id: number): Promise<Corredor> {
    const corredor = await this.findOne(id);

    corredor.ativo = false;

    return this.corredorRepository.save(corredor);
  }
}
