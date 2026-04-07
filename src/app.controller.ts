import { Controller, Get } from '@nestjs/common';
import { slugify } from 'slug-generator';

@Controller()
export class AppController {
  @Get()
  getMassage(): string {
    const text: string = 'Hello NestJS Project!';
    return slugify(text);
  }
}
