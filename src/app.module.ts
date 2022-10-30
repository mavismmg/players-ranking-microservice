import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env']}),
    MongooseModule.forRoot(`mongodb+srv://mongodb-${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
