import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadosService } from './supermercados.service';

describe('SupermercadosService', () => {
  let service: SupermercadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermercadosService],
    }).compile();

    service = module.get<SupermercadosService>(SupermercadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
