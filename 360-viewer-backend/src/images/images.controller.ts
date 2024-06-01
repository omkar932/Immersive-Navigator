import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './images.dto';
import { Image } from './images.schema';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @Body() createImageDto: CreateImageDto,
  ): Promise<Image> {
    const url = `http://localhost:3000/images/${file.filename}`;
    return this.imagesService.create({ ...createImageDto, url });
  }

  @Get()
  async findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = await this.imagesService.getFile(filename);
    fileStream.pipe(res);
  }
}
