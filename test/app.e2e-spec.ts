import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Imager', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Uploads main image from facebook to cdn server', async () => {
    const response = await request(app.getHttpServer())
      .post('?url=facebook.com')
      .expect(201);

    expect(response.body).toHaveProperty('cdnUrl');
    expect(response.body.cdnUrl.startsWith('http://file-api.fra02.sl.labs/lc/img/')).toBeTruthy();
  });
});
