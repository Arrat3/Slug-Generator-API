import { Slug } from './slug.model';

export class SlugMapper {
  static mapToSlug(record: {
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
}
