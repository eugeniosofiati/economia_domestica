import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from './entity/auditoria.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly repo: Repository<Auditoria>,
  ) {}

  async registrar(data: {
    id_usuario?: number;
    rota: string;
    metodo: string;
    corpo?: any;
    ip?: string;
  }) {
    const registro = this.repo.create({
      id_usuario: data.id_usuario ?? null,
      rota: data.rota,
      metodo: data.metodo,
      corpo: data.corpo ? JSON.stringify(data.corpo) : null,
      ip: data.ip,
      criado_em: new Date(),
    });

    await this.repo.save(registro);
  }
}
