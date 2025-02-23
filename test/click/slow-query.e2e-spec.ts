import { SaveSlowQueryDto } from '@/api/click/slow-query/dto/save-slow-query.dto';
import * as request from 'supertest';
import { signinTest } from 'test/e2e/common';
import {
  app,
  setupTestEnvironment,
  teardownTestEnvironment,
} from 'test/e2e/setup';

describe('Auth (e2e)', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  it('click/slow-query (Post)', async () => {
    const response = await request(app.getHttpServer())
      .post('/click/slow-query')
      .send({
        ykiho: '10170068',
        computerName: 'test컴퓨터',
        assemblyName: 'MyAssembly',
        className: 'MyClass',
        methodName: 'MyMethod',
        queryString: 'SELECT * FROM users',
        executionSeconds: 10.25,
        stackFrames: [
          {
            assemblyName: 'MyAssembly',
            className: 'MyClass',
            methodName: 'MyMethod',
            offset: 0,
            ilOffset: 0,
            columnNumber: 1,
            lineNumber: 1,
            fileName: 'test.js',
          },
        ],
        ver: '1.0.0',
      } satisfies SaveSlowQueryDto)
      .expect(201);

    expect(response.body.ykiho).toBe('10170068');
  });

  it('click/slow-query (GET)', async () => {
    const { accessToken } = await signinTest(app);
    const response = await request(app.getHttpServer())
      .get('/click/slow-query')
      .query({ ymd: '20250121' })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('ykiho');
    expect(response.body[0]).toHaveProperty('computerName');
    expect(response.body[0]).toHaveProperty('assemblyName');
    expect(response.body[0]).toHaveProperty('className');
    expect(response.body[0]).toHaveProperty('methodName');
    expect(response.body[0]).toHaveProperty('queryString');
    expect(response.body[0]).toHaveProperty('executionSeconds');
  });

  it('click/slow-query/:id/stackFrames (GET)', async () => {
    const { accessToken } = await signinTest(app);
    const response = await request(app.getHttpServer())
      .get('/click/slow-query/38/stackFrames')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('assemblyName');
    expect(response.body[0]).toHaveProperty('className');
    expect(response.body[0]).toHaveProperty('methodName');
    expect(response.body[0]).toHaveProperty('offset');
    expect(response.body[0]).toHaveProperty('ilOffset');
    expect(response.body[0]).toHaveProperty('columnNumber');
    expect(response.body[0]).toHaveProperty('lineNumber');
    expect(response.body[0]).toHaveProperty('fileName');
  });
});
