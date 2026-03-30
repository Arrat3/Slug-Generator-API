import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getMassage(): string {
    return 'Hello NestJS Project!';
  }
}
