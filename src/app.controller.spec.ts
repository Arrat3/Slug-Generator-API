import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appcontroller: AppController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
    appcontroller = module.get<AppController>(AppController);
  });
  describe('getMassage', () => {
    it('Should return "Hello World!"', () => {
      expect(appcontroller.getMassage()).toBe('Hello NestJS Project!');
    });
  });
});
