import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AddChatEventDto } from './dto/add-chatEvent.dto';

@Injectable()
export class ChatEventsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createEvent(eventDto: AddChatEventDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('chat_events')
      .insert([eventDto])
      .select();

    if (error) throw new Error(`Error al crear evento: ${error.message}`);

    return data;
  }

  async getEventsByChat(chat_id: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('chat_events')
      .select('*')
      .eq('chat_id', chat_id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Error al obtener eventos: ${error.message}`);

    return data;
  }

  async getEventsByType(chat_id: string, event_type: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('chat_events')
      .select('*')
      .eq('chat_id', chat_id)
      .eq('event_type', event_type)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Error al obtener eventos por tipo: ${error.message}`);

    return data;
  }

  async getEventsByMessageId(message_id: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('chat_events')
      .select('*')
      .eq('message_id', message_id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Error al obtener eventos por mensaje: ${error.message}`);

    return data;
  }
}