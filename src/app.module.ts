import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SlugModule } from './slug/slug.module';

@Module({
  imports: [SlugModule],
  controllers: [AppController],
})
export class AppModule {}
