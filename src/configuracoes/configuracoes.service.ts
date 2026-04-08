import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracao } from './entity/configuracao.entity';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';

@Injectable()
export class ConfiguracoesService {
  constructor(
    @InjectRepository(Configuracao)
    private readonly repo: Repository<Configuracao>,
  ) {}

  async findAll(): Promise<Configuracao[]> {
    return this.repo.find({ order: { chave: 'ASC' } });
  }

  async findOne(chave: string): Promise<Configuracao> {
    const config = await this.repo.findOne({ where: { chave } });

    if (!config) {
      throw new NotFoundException(`Configuração '${chave}' não encontrada.`);
    }

    return config;
  }

  async update(chave: string, dto: UpdateConfiguracaoDto): Promise<Configuracao> {
    const config = await this.findOne(chave);

    config.valor = dto.valor;

    return this.repo.save(config);
  }

  async get(chave: string): Promise<string> {
    const config = await this.findOne(chave);
    return config.valor;
  }
}
