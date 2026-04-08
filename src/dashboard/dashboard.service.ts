import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from '../auditoria/entity/auditoria.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly auditoriaRepo: Repository<Auditoria>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async getResumo() {
    const totalUsuarios = await this.usuarioRepo.count();
    const totalAcoes = await this.auditoriaRepo.count();

    const ultimasAcoes = await this.auditoriaRepo.find({
      order: { criado_em: 'DESC' },
      take: 10,
    });

    return {
      totalUsuarios,
      totalAcoes,
      ultimasAcoes,
    };
  }
}
