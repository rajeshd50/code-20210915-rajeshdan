import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ErrorInterceptor } from '../src/interceptors/error.interceptor';
import { json } from 'body-parser';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ErrorInterceptor())
    app.enableShutdownHooks()
    app.use(json({limit: '100mb'}))
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/calculate-bmi (POST) should return error if no data passed', () => {
    return request(app.getHttpServer())
      .post('/calculate-bmi')
      .send()
      .expect(400);
  });
  it('/calculate-bmi (POST) should return correct result for 1 entity', () => {
    return request(app.getHttpServer())
      .post('/calculate-bmi')
      .send(require('../data/bmi_test_input_1.json'))
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(require('../data/bmi_test_output_1.json'))
  });
  it('/calculate-bmi (POST) should return correct result for 100 entity', () => {
    return request(app.getHttpServer())
      .post('/calculate-bmi')
      .send(require('../data/bmi_test_input_100.json'))
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(require('../data/bmi_test_output_100.json'))
  });
  it('/calculate-bmi (POST) should return correct result for 1000 entity', () => {
    return request(app.getHttpServer())
      .post('/calculate-bmi')
      .send(require('../data/bmi_test_input_1000.json'))
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(require('../data/bmi_test_output_1000.json'))
  });
});
