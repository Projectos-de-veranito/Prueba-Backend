import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ChatsService } from '../chats/chats.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ChatsService, SupabaseService],
})
export class UsersModule {}
