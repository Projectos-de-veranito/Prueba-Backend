import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async sendMessage(createMessageDto: CreateMessageDto) {
    const { chat_id, sender_id, content, media_url } = createMessageDto;

    const { data, error } = await this.supabase
      .from('messages')
      .insert([{ chat_id, sender_id, content, media_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMessages(chatId: string, limit: number, offset: number) {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async markAsRead(messageIds: string[]) {
    const { data, error } = await this.supabase
      .from('messages')
      .update({ read: true })
      .in('id', messageIds)
      .select();

    if (error) throw error;
    return data;
  }

  async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    const { content } = updateMessageDto;

    const { data, error } = await this.supabase
      .from('messages')
      .update({ content })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteMessage(id: string) {
    const { error } = await this.supabase.from('messages').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Mensaje eliminado correctamente' };
  }
}