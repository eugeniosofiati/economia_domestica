import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';
import { extname } from 'path';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly service: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('arquivo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const nome = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          callback(null, `${nome}${ext}`);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const registro = await this.service.registrarArquivo(file);

    return {
      mensagem: 'Upload realizado com sucesso.',
      arquivo: registro,
      url: `/uploads/${registro.nome_armazenado}`,
    };
  }
}
