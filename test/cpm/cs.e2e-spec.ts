import { apiHeader } from '@/constants/api-header';
import * as request from 'supertest';
import { app, setupCpmTestEnvironment, teardownTestEnvironment } from 'test/e2e/setup';

describe('CPM CS (e2e)', () => {
  beforeAll(async () => {
    await setupCpmTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  it('/cpm/cs/names (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/cpm/cs/names')      
      .set(apiHeader.click.key, apiHeader.click.value)
      .expect(200);

    expect(response.body.totalCount).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);

    const firstItem = response.body.data[0];
    expect(firstItem).toHaveProperty('code');
    expect(firstItem).toHaveProperty('myung');
  });
});