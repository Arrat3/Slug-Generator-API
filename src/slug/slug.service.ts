import { BadRequestException, Injectable } from '@nestjs/common';
import { Slug } from './slug.model';
import { slugify } from 'slug-generator';
import { SlugRepository } from './slug.repository';

@Injectable()
export class SlugService {
  constructor(private readonly slugRepository: SlugRepository) {}

  private mapSlug(record: {
    id: number;
    originalString: string;
    slug: string;
  }): Slug {
    return {
      id: record.id,
      original: record.originalString,
      slug: record.slug,
    };
  }

  ensureNotEmptySlug(original: string): void {
    if (original.trim() === '') {
      throw new BadRequestException('Original string cannot be empty');
    }
  }

  async ensureExistingSlug(newSlug: string): Promise<boolean> {
    return (await this.slugRepository.findBySlug(newSlug)) !== null;
  }

  async createNewSlug(original: string): Promise<Slug> {
    console.log('Original : ', original);
    this.ensureNotEmptySlug(original);
    const newSlugy = slugify(original);

    console.log('New Slug : ', newSlugy);

    if (await this.ensureExistingSlug(newSlugy)) {
      throw new BadRequestException('Slug already exists');
    }

    const newSlug = await this.slugRepository.create({
      originalString: original,
      slug: newSlugy,
    });

    return this.mapSlug(newSlug);
  }

  async getAllSlugs(): Promise<Slug[]> {
    const slugs = await this.slugRepository.findAll();
    return slugs.map((slug) => this.mapSlug(slug));
  }

  ensureValidId(id: number): void {
    if (id <= 0) {
      throw new BadRequestException('Invalid id');
    }
  }

  async getSlugById(id: number) {
    const slug = await this.slugRepository.findById(id);
    if (!slug) {
      throw new BadRequestException(`Slug with id ${id} does not exist`);
    }
    return slug;
  }

  async getById(id: number): Promise<Slug> {
    this.ensureValidId(id);
    const slug = await this.getSlugById(id);
    return this.mapSlug(slug);
  }

  async deleteById(id: number): Promise<string> {
    this.ensureValidId(id);
    await this.getSlugById(id);
    await this.slugRepository.deleteById(id);
    return `Slug with id ${id} deleted successfully`;
  }

  async ensureNotDuplicateSlug(
    newSlug: string,
    currentSlugId: number,
  ): Promise<void> {
    const duplicateSlug = await this.slugRepository.findBySlug(newSlug);
    if (duplicateSlug && duplicateSlug.id !== currentSlugId) {
      throw new BadRequestException('Slug already exists');
    }
  }

  async updateById(id: number, original: string): Promise<Slug> {
    this.ensureNotEmptySlug(original);
    this.ensureValidId(id);

    const currentSlug = await this.getSlugById(id);
    const newSlugValue = slugify(original);
    await this.ensureNotDuplicateSlug(newSlugValue, currentSlug.id);

    const updatedSlug = await this.slugRepository.updateById(id, {
      originalString: original,
      slug: newSlugValue,
    });

    return this.mapSlug(updatedSlug);
  }
}
