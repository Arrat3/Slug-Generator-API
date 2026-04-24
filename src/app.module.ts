import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SlugModule } from './slug/slug.module';

@Module({
  imports: [PrismaModule, SlugModule],
})
export class AppModule {}
