import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './entity/upload.entity';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly repo: Repository<Upload>,
  ) {}

  async registrarArquivo(file: Express.Multer.File) {
    const registro = this.repo.create({
      nome_original: file.originalname,
      nome_armazenado: file.filename,
      caminho: file.path,
      tamanho: file.size,
      tipo: file.mimetype,
      criado_em: new Date(),
    });

    return this.repo.save(registro);
  }
}
