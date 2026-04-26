import { Module } from '@nestjs/common';
import { SlugService } from './slug.service';
import { SlugController } from './slug.controller';
import { SlugRepository } from './slug.repository';

@Module({
  controllers: [SlugController],
  providers: [SlugService, SlugRepository],
})
export class SlugModule {}
