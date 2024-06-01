import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './images.schema';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
const env = config().parsed;

const storage = new GridFsStorage({
  url: env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    MulterModule.register({ storage }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
