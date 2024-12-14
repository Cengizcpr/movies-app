import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesModule } from './movies.module';

describe('Movies Test)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        MongooseModule.forRoot(
          'mongodb+srv://movie:asus33792@cluster0.rscrs.mongodb.net/',
        ),
        MoviesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /movies/fetch', async () => {
    const response = await request(app.getHttpServer()).get('/movies/fetch');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Movies fetched and saved.');
  });

  it('POST /movies', async () => {
    const movieData = {
      id: '123',
      name: 'Harry Potter',
      releaseDate: '1997-05-05',
      popularity: 10.0,
      overview: 'A groundbreaking sci-fi movie.',
      voteAverage: 10.0,
      voteCount: 10000,
      genre: [],
    };

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(movieData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Harry Potter');
  });

  it('GET /movies/:id', async () => {
    const id = '123';
    const response = await request(app.getHttpServer()).get(`/movies/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.movie).toHaveProperty('id', id);
  });

  it('GET /movies', async () => {
    const response = await request(app.getHttpServer()).get('/movies');
    expect(response.status).toBe(200);
  });

  it('PUT /movies/:id', async () => {
    const id = '123';
    const updateData = {
      name: 'Harry Potter Updated',
      releaseDate: '2015-07-16',
    };

    const response = await request(app.getHttpServer())
      .put(`/movies/${id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.movie).toHaveProperty('name', 'Harry Potter Updated');
  });

  it('DELETE /movies/:id', async () => {
    const id = '123';
    const response = await request(app.getHttpServer()).delete(`/movies/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.movie).toHaveProperty('id', id);
  });
});
