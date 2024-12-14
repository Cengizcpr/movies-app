import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

class Genre {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateMovieDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  overview?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  popularity?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  voteAverage?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  voteCount?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  releaseDate?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  genre?: Genre[];
}
