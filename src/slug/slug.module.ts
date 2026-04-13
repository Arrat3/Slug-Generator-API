import { Module } from '@nestjs/common';
import { SlugService } from './slug.service';
import { SlugController } from './slug.controller';

@Module({
  controllers: [SlugController],
  providers: [SlugService],
})
export class SlugModule {}
