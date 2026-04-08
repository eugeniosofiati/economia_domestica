import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadosController } from './supermercados.controller';

describe('SupermercadosController', () => {
  let controller: SupermercadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermercadosController],
    }).compile();

    controller = module.get<SupermercadosController>(SupermercadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
