import { Module } from '@nestjs/common';
import { ChatEventsService } from './chatEvents.service';
import { ChatEventsController } from './chatEvents.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [ChatEventsController],
  providers: [ChatEventsService, SupabaseService],
  exports: [ChatEventsService],
})
export class ChatEventsModule {}