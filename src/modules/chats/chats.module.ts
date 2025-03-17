import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [ChatsController],
  providers: [ChatsService, SupabaseService],
})
export class ChatsModule {}
