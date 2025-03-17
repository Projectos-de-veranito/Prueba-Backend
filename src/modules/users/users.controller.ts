import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChatsService } from '../chats/chats.service'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private readonly chatsService: ChatsService 
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/chats')
  async getUserChats(@Param('id') id: string) {
    return this.chatsService.getChatsByUser(id); 
  }

  @Get(':id/contacts')
  async getUserContacts(@Param('id') id: string) {
    return this.usersService.getUserContacts(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
