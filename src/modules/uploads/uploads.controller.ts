import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AddUploadDto } from './dto/add-upload.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('upload/:user_id/:chat_id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: string,
    @Param('chat_id') chat_id: string
  ) {
    return this.uploadsService.uploadFile(file, user_id, chat_id);
  }

  @Get('chat/:chat_id')
  async getFilesByChat(@Param('chat_id') chat_id: string) {
    return this.uploadsService.getFilesByChat(chat_id);
  }
}
