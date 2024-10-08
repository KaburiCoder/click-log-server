import { SaveErrorLogDto } from '@/api/click/dto/save-error-log.dto';
import * as request from 'supertest';
import { app, setupTestEnvironment, teardownTestEnvironment } from 'test/e2e/setup';

describe('Auth (e2e)', () => {
  beforeAll(async () => {
    await setupTestEnvironment()
  });

  afterAll(async () => {
    await teardownTestEnvironment()
  });

  it('/error-log (Post)', async () => {
    const response = await request(app.getHttpServer())
      .post("/click/error-log")
      .send({
        "ykiho": "10001000",
        "computerName": "test컴퓨터",
        "moduleName": "test.exe",
        "logLevel": "ERROR",
        "exceptionType": "textException",
        "errorMessage": "An unexpected error occurred.",
        "stackTrace": "Error: Something went wrong at main.js:25:13",
        "source": "main.js",
        "additionalData": {
          "userId": "987",
        },
        "clientVersion": "V00010001"
      } satisfies SaveErrorLogDto).expect(201);

    expect(response.body.ykiho).toBe("10001000");
  });
});
