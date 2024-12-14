import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schema/movies.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}
  async fetchMovies() {
    try {
      const { data } = await this.httpService
        .get(`${process.env.TMDB_URL}/discover/movie`, {
          params: {
            api_key: process.env.TMDB_API_KEY,
            sort_by: 'release_date.asc',
            vote_count_gte: 1500,
            vote_average_gte: 8.4,
            watch_provider_id: 8,
            watch_region: 'TR',
          },
        })
        .toPromise();

      if (!data.results || data.results.length === 0) {
        return { message: 'No movies found.' };
      }

      const movies = data.results.slice(0, 5);

      const response = [];

      for (const movie of movies) {
        try {
          const { data: movieDetails } = await this.httpService
            .get(`${process.env.TMDB_URL}/movie/${movie.id}`, {
              params: { api_key: process.env.TMDB_API_KEY },
            })
            .toPromise();

          const movieData = {
            id: movie.id.toString(),
            name: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            releaseDate: movie.release_date,
            genre: movieDetails.genres.map((g) => ({
              id: g.id,
              name: g.name,
            })),
          };

          await this.movieModel.create(movieData);

          response.push({
            status: 'Saved',
            movie: movieData,
          });
        } catch (error) {
          response.push({
            status: 'Failed to fetch movie details',
            movieId: movie.id,
            error: error.message,
          });
        }
      }

      return response;
    } catch (error) {
      return { message: 'API Error', error: error.message };
    }
  }

  async save(movie: CreateMovieDto): Promise<any> {
    try {
      const createdMovie = new this.movieModel(movie);
      return await createdMovie.save();
    } catch (error) {
      return { message: 'Failed to save movie', error: error.message };
    }
  }

  async update(id: string, movieData: UpdateMovieDto): Promise<any> {
    try {
      const updatedMovie = await this.movieModel.findOneAndUpdate(
        { id },
        { $set: movieData },
        { new: true },
      );

      if (!updatedMovie) {
        return { message: 'Movie not found.' };
      }

      return { status: 'Updated', movie: updatedMovie };
    } catch (error) {
      return { message: 'Update error', error: error.message };
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const movie = await this.movieModel.findOne({ id });
      if (!movie) {
        return { message: 'Movie not found.' };
      }
      return { status: 'Movie Found', movie };
    } catch (error) {
      return { message: 'FindById Error', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const movies = await this.movieModel.find().exec();
      return { movies };
    } catch (error) {
      return { message: 'Error fetching movies', error: error.message };
    }
  }

  async removeById(id: string): Promise<any> {
    try {
      const deletedMovie = await this.movieModel.findOneAndDelete({ id });
      if (!deletedMovie) {
        return { message: 'Movie not found.' };
      }
      return { status: 'Deleted', movie: deletedMovie };
    } catch (error) {
      return { message: 'Delete error', error: error.message };
    }
  }
}
