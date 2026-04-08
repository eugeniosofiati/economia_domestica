import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditoriaService } from './auditoria.service';

@Injectable()
export class AuditoriaInterceptor implements NestInterceptor {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const rota = req.url;
    const metodo = req.method;
    const corpo = req.body;
    const ip = req.ip;
    const id_usuario = req.user?.id ?? null;

    return next.handle().pipe(
      tap(() => {
        this.auditoriaService.registrar({
          id_usuario,
          rota,
          metodo,
          corpo,
          ip,
        });
      }),
    );
  }
}
