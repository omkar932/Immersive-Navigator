import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Image } from './images.schema';
import { CreateImageDto } from './images.dto';

@Injectable()
export class ImagesService {
  private gridFsBucket: GridFSBucket;

  constructor(
    @InjectModel('Image') private imageModel: Model<Image>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.gridFsBucket = new GridFSBucket(this.connection.db, {
      bucketName: 'uploads',
    });
  }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const createdImage = new this.imageModel(createImageDto);
    return createdImage.save();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async getFile(fileId: string): Promise<any> {
    const fileStream = this.gridFsBucket.openDownloadStreamByName(fileId);
    if (!fileStream) {
      throw new NotFoundException('File not found');
    }
    return fileStream;
  }
}
