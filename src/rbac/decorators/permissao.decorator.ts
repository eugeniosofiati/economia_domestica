import { SetMetadata } from '@nestjs/common';

export const PERMISSAO_KEY = 'permissao';

export const Permissao = (chave: string) =>
  SetMetadata(PERMISSAO_KEY, chave);
