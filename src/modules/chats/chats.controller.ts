import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  // Ruta para obtener un chat por ID
  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return this.chatsService.getChatsById(id); // Cambié el nombre del método a getChatsById
  }

  // Ruta para obtener todos los chats
  @Get()
  async getAllChats() {
    return this.chatsService.getAllChats();
  }

  // Ruta para obtener los chats de un usuario específico
  @Get('user/:userId')
  async getChatsByUser(@Param('userId') userId: string) {
    return this.chatsService.getChatsByUser(userId); // Este es el método para obtener chats por usuario
  }

  @Get(':chatId/messages')
  async getMessagesByChat(@Param('chatId') chatId: string) {
    // Suponiendo que tienes un servicio para obtener los mensajes de un chat
    return this.chatsService.getMessagesByChat(chatId);
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

  // Ruta para obtener los miembros de un chat
  @Get(':id/members')
  async getChatMembers(@Param('id') chat_id: string) {
    return this.chatsService.getChatMembers(chat_id);
  }

  // Ruta para eliminar un miembro de un chat
  @Delete(':id/members/:user_id')
  async removeMember(@Param('id') chat_id: string, @Param('user_id') user_id: string) {
    return this.chatsService.removeMember(chat_id, user_id);
  }
}
