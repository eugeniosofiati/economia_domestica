import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AuditoriaInterceptor } from './auditoria/auditoria.interceptor';
import { AuditoriaService } from './auditoria/auditoria.service';

import { LogsInterceptor } from './logs/logs.interceptor';
import { LogsService } from './logs/logs.service';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir arquivos estáticos (uploads)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Interceptor global de auditoria
  const auditoriaService = app.get(AuditoriaService);
  app.useGlobalInterceptors(new AuditoriaInterceptor(auditoriaService));

  // Interceptor global de logs de erro
  const logsService = app.get(LogsService);
  app.useGlobalInterceptors(new LogsInterceptor(logsService));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
