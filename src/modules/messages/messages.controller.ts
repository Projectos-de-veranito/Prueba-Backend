import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post(':chat_id/messages')
  async sendMessage(
    @Param('chat_id') chatId: string,
    @Body() createMessageDto: CreateMessageDto
  ) {
    try {
      const message = await this.messagesService.sendMessage({
        chat_id: chatId,
        sender_id: createMessageDto.sender_id,
        content: createMessageDto.content,
        media_url: createMessageDto.media_url,
      });
      return message;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
      throw new Error(`Error al enviar el mensaje: ${error.message}`);
    }
  }

  @Get(':chat_id')
  async getMessages(
    @Param('chat_id') chatId: string,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0
  ) {
    try {
      const messages = await this.messagesService.getMessages(chatId, Number(limit), Number(offset));
      return messages;
    } catch (error) {
      console.error('Error al obtener los mensajes:', error.message);
      throw new Error(`Error al obtener los mensajes: ${error.message}`);
    }
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
