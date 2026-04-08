import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(dto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create({
      ...dto,
      ativo: true,
    });

    return this.produtoRepository.save(produto);
  }

  async findAll(status: string = 'ativos'): Promise<Produto[]> {
    if (status === 'inativos') {
      return this.produtoRepository.find({
        where: { ativo: false },
        order: { id: 'DESC' },
      });
    }

    if (status === 'todos') {
      return this.produtoRepository.find({
        order: { id: 'DESC' },
      });
    }

    return this.produtoRepository.find({
      where: { ativo: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id, ativo: true },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado ou inativo.`);
    }

    return produto;
  }

  async update(id: number, dto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);

    Object.assign(produto, dto);

    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<Produto> {
    const produto = await this.findOne(id);

    produto.ativo = false;

    return this.produtoRepository.save(produto);
  }
}
