import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AddMemberDto } from './dto/add-member.dto';


@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return this.chatsService.getChatById(id);
  }

  @Get()
  async getAllChats() {
    return this.chatsService.getAllChats();
  }

  @Patch(':id')
  async updateChat(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.updateChat(id, updateChatDto);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatsService.deleteChat(id);
  }

  @Post('members')
  async addMember(@Body() addMemberDto: AddMemberDto) {
    return this.chatsService.addMember(addMemberDto);
  }

  @Get(':id/members')
  async getChatMembers(@Param('id') chat_id: string) {
    return this.chatsService.getChatMembers(chat_id);
  }

  @Delete(':id/members/:user_id')
  async removeMember(@Param('id') chat_id: string, @Param('user_id') user_id: string) {
    return this.chatsService.removeMember(chat_id, user_id);
  }
}
