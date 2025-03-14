import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(
    @Body() body: { sender_id: string; receiver_id: string; content: string; media_url?: string },
  ) {
    return this.messagesService.sendMessage(body.sender_id, body.receiver_id, body.content, body.media_url);
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: string) {
    return this.messagesService.getMessages(userId);
  }
}
