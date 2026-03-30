import { Injectable, BadRequestException } from '@nestjs/common';
import { Slug } from './slug.model';
import { slugify } from 'slug-generator';

@Injectable()
export class SlugService {
  private slugs: Slug[] = [];
  private currentId: number = 1;

  createNewSlug(original: string): Slug {
    const newSlugy = slugify(original);
    if (this.slugs.find((item) => item.slug === newSlugy))
      throw new BadRequestException('Slug already exists');
    else {
      const newSlug: Slug = {
        id: this.currentId,
        original,
        slug: newSlugy,
      };
      this.slugs.push(newSlug);
      this.currentId++;
      return newSlug;
    }
  }

  getAllSlugs(): Slug[] {
    return this.slugs;
  }

  getById(id: number): Slug {
    const index = this.slugs.findIndex((item) => item.id === id);
    if (index === -1) throw new BadRequestException('Slug does not exist');
    else return this.slugs[index];
  }

  deleteById(id: number): string {
    const index = this.slugs.findIndex((item) => item.id === id);
    if (index === -1) {
      return `Slug with id ${id} does not exist`;
    } else {
      this.slugs.splice(index, 1);
      return `Slug with id ${id} deleted successfully`;
    }
  }
}
