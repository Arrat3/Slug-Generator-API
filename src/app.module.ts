import { Module } from '@nestjs/common';
import { SlugModule } from './slug/slug.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SlugModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
