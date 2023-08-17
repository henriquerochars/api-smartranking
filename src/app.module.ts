import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://henriquers:h33366345@cluster0.c61u2lf.mongodb.net/?retryWrites=true&w=majority',
    ),
    PlayersModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
