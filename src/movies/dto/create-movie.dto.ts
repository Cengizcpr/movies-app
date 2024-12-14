import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

class Genre {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  overview: string;

  @ApiProperty()
  @IsNumber()
  popularity: number;

  @ApiProperty()
  @IsNumber()
  voteAverage: number;

  @ApiProperty()
  @IsNumber()
  voteCount: number;

  @ApiProperty()
  @IsString()
  releaseDate: string;

  @ApiProperty()
  @IsArray()
  genre: Genre[];
}
