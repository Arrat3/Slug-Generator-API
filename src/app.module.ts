import { Module } from '@nestjs/common';
import { SlugModule } from './slug/slug.module';

@Module({
  imports: [SlugModule],
})
export class AppModule {}
