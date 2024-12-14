import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

class Genre {
  id: number;
  name: string;
}

@Schema()
export class Movie {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  overview: string;

  @Prop({ type: Number, required: true })
  popularity: number;

  @Prop({ type: Number, required: true })
  voteAverage: number;

  @Prop({ type: Number, required: true })
  voteCount: number;

  @Prop({ type: String, required: true })
  releaseDate: string;

  @Prop({ type: Array, required: true })
  genre: Genre[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
