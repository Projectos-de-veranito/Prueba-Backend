import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class MessagesService {
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async sendMessage(senderId: string, receiverId: string, content: string, mediaUrl?: string) {
    const { data, error } = await this.supabase
      .from('messages')
      .insert([{ sender_id: senderId, receiver_id: receiverId, content, media_url: mediaUrl, read: false }]);

    if (error) throw error;
    return data;
  }

  async getMessages(userId: string) {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
