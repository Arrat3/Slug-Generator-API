import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SlugDto } from '../links/dto/slug.dto';

@Injectable()
export class SlugRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: SlugDto) {
    return this.prisma.slug.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.slug.findMany();
  }

  async findById(id: number) {
    return this.prisma.slug.findUnique({
      where: { id },
    });
  }

  async deleteById(id: number) {
    return this.prisma.slug.delete({
      where: { id },
    });
  }
}
