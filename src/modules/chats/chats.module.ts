import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, SupabaseService],
})
export class ChatsModule {}
