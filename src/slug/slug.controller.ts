import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SlugService } from './slug.service';

@Controller('slug')
export class SlugController {
  constructor(private readonly slugService: SlugService) {}
  @Post()
  createNewSlug(@Body('original') original: string) {
    return this.slugService.createNewSlug(original);
  }

  @Get()
  getAllSlugs() {
    return this.slugService.getAllSlugs();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.slugService.getById(Number(id));
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.slugService.deleteById(Number(id));
  }
}
