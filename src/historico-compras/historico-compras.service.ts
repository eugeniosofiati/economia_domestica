import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricoCompra } from './entities/historico-compra.entity';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';

@Injectable()
export class HistoricoComprasService {
  constructor(
    @InjectRepository(HistoricoCompra)
    private readonly repo: Repository<HistoricoCompra>,
  ) {}

  create(dto: CreateHistoricoCompraDto) {
    const novo = this.repo.create({
      ...dto,
      ativo: true,
    });

    return this.repo.save(novo);
  }

  findAll(status: string = 'ativos') {
    if (status === 'inativos') {
      return this.repo.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.repo.find({
        order: { id: 'DESC' },
      });
    }

    // padrão: ativos
    return this.repo.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const registro = await this.repo.findOne({
      where: { id, ativo: true },
    });

    if (!registro) {
      throw new NotFoundException(`Histórico com ID ${id} não encontrado ou inativo.`);
    }

    return registro;
  }

  async update(id: number, dto: UpdateHistoricoCompraDto) {
    const registro = await this.findOne(id);

    Object.assign(registro, dto);

    return this.repo.save(registro);
  }

  async softDelete(id: number) {
    const registro = await this.findOne(id);

    registro.ativo = false;

    return this.repo.save(registro);
  }
}
