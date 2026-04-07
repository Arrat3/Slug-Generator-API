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

  createNewSlug(original: string): Slug {
    const newSlugy = slugify(original);
    if (this.slugs.find((item) => item.slug === newSlugy)) {
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

  lookForInvalidId(id: number): void {
    if (id <= 0) {
      throw new BadRequestException('Invalid id');
    }
  }

  lookForValidId(id: number): void {
    if (this.slugs.findIndex((item) => item.id === id) === -1) {
      throw new BadRequestException(`Slug with id ${id} does not exist`);
    }
  }

  getById(id: number): Slug {
    this.lookForInvalidId(id);
    this.lookForValidId(id);
    const index = this.slugs.findIndex((item) => item.id === id);
    return this.slugs[index];
  }

  deleteById(id: number): string {
    this.lookForInvalidId(id);
    this.lookForValidId(id);
    const index = this.slugs.findIndex((item) => item.id === id);
    this.slugs.splice(index, 1);
    return `Slug with id ${id} deleted successfully`;
  }

  updateById(id: number, original: string): Slug {
    this.lookForInvalidId(id);
    this.lookForValidId(id);
    const index = this.slugs.findIndex((item) => item.id === id);
    const newSlug = this.slugs[index];
    newSlug.original = original;
    newSlug.slug = slugify(original);
    this.slugs[index] = newSlug;
    return newSlug;
  }
}
