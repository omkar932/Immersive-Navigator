import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
const env = config().parsed;
@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI), ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
