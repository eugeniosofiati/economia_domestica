import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './entity/notificacao.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificacoesService {
  private transporter;

  constructor(
    @InjectRepository(Notificacao)
    private readonly repo: Repository<Notificacao>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async enviarEmail(destino: string, assunto: string, mensagem: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: destino,
      subject: assunto,
      html: mensagem,
    });

    const registro = this.repo.create({
      tipo: 'email',
      destino,
      assunto,
      mensagem,
      enviado_em: new Date(),
    });

    await this.repo.save(registro);
  }
}
