import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatEventsService } from './chatEvents.service';
import { AddChatEventDto } from './dto/add-chatEvent.dto';

@Controller('chat-events')
export class ChatEventsController {
  constructor(private readonly chatEventsService: ChatEventsService) {}

  @Post()
  async createEvent(@Body() eventDto: AddChatEventDto) {
    return this.chatEventsService.createEvent(eventDto);
  }

  @Get('chat/:chat_id')
  async getEventsByChat(@Param('chat_id') chat_id: string) {
    return this.chatEventsService.getEventsByChat(chat_id);
  }

  @Get('chat/:chat_id/type/:event_type')
  async getEventsByType(
    @Param('chat_id') chat_id: string,
    @Param('event_type') event_type: string,
  ) {
    return this.chatEventsService.getEventsByType(chat_id, event_type);
  }

  @Get('message/:message_id')
  async getEventsByMessageId(@Param('message_id') message_id: string) {
    return this.chatEventsService.getEventsByMessageId(message_id);
  }
}