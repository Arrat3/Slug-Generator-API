import { Injectable, BadRequestException } from '@nestjs/common';
import { Slug } from './slug.model';
import { slugify } from 'slug-generator';

@Injectable()
export class SlugService {
  private slugs: Slug[] = [];
  private nextId: number = 1;

  incrementNextId(): void {
    this.nextId++;
  }

  doesSlugExist(slug: string): boolean {
    return !!this.slugs.find((item) => item.slug === slug);
  }

  ensureNotEmptySlug(original: string): void {
    if (original.trim() === '') {
      throw new BadRequestException('Original string cannot be empty');
    }
  }

  createNewSlug(original: string): Slug {
    this.ensureNotEmptySlug(original);
    const newSlugy = slugify(original);
    if (this.doesSlugExist(newSlugy)) {
      throw new BadRequestException('Slug already exists');
    } else {
      const newSlug: Slug = {
        id: this.nextId,
        original,
        slug: newSlugy,
      };
      this.slugs.push(newSlug);
      this.incrementNextId();
      return newSlug;
    }
  }

  getAllSlugs(): Slug[] {
    return this.slugs;
  }

  ensureValidId(id: number): void {
    if (id <= 0) {
      throw new BadRequestException('Invalid id');
    }
  }

  getSlugIndex(id: number): number {
    const index: number = this.slugs.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new BadRequestException(`Slug with id ${id} does not exist`);
    }
    return index;
  }

  getById(id: number): Slug {
    this.ensureValidId(id);
    const index = this.getSlugIndex(id);
    return this.slugs[index];
  }

  deleteById(id: number): string {
    this.ensureValidId(id);
    const index = this.getSlugIndex(id);
    this.slugs.splice(index, 1);
    return `Slug with id ${id} deleted successfully`;
  }

  updateById(id: number, original: string): Slug {
    this.ensureNotEmptySlug(original);
    this.ensureValidId(id);
    const index: number = this.getSlugIndex(id);
    const newSlug = this.slugs[index];
    newSlug.original = original;
    newSlug.slug = slugify(original);
    this.slugs[index] = newSlug;
    return newSlug;
  }
}
