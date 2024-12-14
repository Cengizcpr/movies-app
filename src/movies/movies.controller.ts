import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('fetch')
  async fetchMovies() {
    await this.moviesService.fetchMovies();
    return { message: 'Movies fetched and saved.' };
  }

  @Post()
  async save(@Body() movie: CreateMovieDto) {
    return this.moviesService.save(movie);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return this.moviesService.removeById(id);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }
}
