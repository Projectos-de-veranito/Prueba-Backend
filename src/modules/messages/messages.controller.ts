import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessage(createMessageDto);
  }

  @Get(':chat_id')
  async getMessages(
    @Param('chat_id') chatId: string,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0
  ) {
    return this.messagesService.getMessages(chatId, Number(limit), Number(offset));
  }

  @Patch('read')
  async markAsRead(@Body('messageIds') messageIds: string[]) {
    return this.messagesService.markAsRead(messageIds);
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto
  ) {
    return this.messagesService.updateMessage(messageId, updateMessageDto);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') messageId: string) {
    return this.messagesService.deleteMessage(messageId);
  }
}
