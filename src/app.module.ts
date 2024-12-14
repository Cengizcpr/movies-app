import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
