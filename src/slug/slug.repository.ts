import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dataDTO } from 'src/links/dto/create-link.dto';

@Injectable()
export class SlugRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: dataDTO) {
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

  async findBySlug(slug: string) {
    return this.prisma.slug.findUnique({
      where: { slug },
    });
  }

  async deleteById(id: number) {
    return this.prisma.slug.delete({
      where: { id },
    });
  }

  async updateById(id: number, data: dataDTO) {
    return this.prisma.slug.update({
      where: { id },
      data,
    });
  }
}
