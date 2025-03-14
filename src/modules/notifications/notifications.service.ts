import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateNotificationDto } from './DTO/create-notification.dto';

@Injectable()
export class NotificationsService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string,
    );
  }

  async create(createNotificationDto: CreateNotificationDto) {
    const { data, error } = await this.supabase
      .from('realtime_notifications')
      .insert(createNotificationDto);

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('realtime_notifications')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('realtime_notifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
