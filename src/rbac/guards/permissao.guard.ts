import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSAO_KEY } from '../decorators/permissao.decorator';
import { RbacService } from '../rbac.service';

@Injectable()
export class PermissaoGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissaoNecessaria = this.reflector.get<string>(
      PERMISSAO_KEY,
      context.getHandler(),
    );

    if (!permissaoNecessaria) return true;

    const req = context.switchToHttp().getRequest();
    const idUsuario = req.user?.id;

    const possui = await this.rbacService.usuarioTemPermissao(
      idUsuario,
      permissaoNecessaria,
    );

    if (!possui) {
      throw new ForbiddenException('Você não tem permissão para acessar esta rota.');
    }

    return true;
  }
}
