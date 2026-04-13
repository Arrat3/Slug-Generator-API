import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Slug API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /slug → create slug', async () => {
    const result = await request(app.getHttpServer())
      .post('/slug')
      .send({ original: 'Hello World' });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body.slug).toBe('hello-world');
  });

  it('GET /slug → return all slugs', async () => {
    const result = await request(app.getHttpServer()).get('/slug');

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('GET /slug/:id → return one slug', async () => {
    const result = await request(app.getHttpServer()).get('/slug/1');

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('id', 1);
  });

  it('DELETE /slug/:id → delete slug', async () => {
    const result = await request(app.getHttpServer()).delete('/slug/1');

    expect(result.status).toBe(200);
  });
});
