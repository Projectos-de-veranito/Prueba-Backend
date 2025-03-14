import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class ContactsService {
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async addContact(userId: string, contactId: string, status: string = 'pending') {
    const { data, error } = await this.supabase
      .from('contacts')
      .insert([{ user_id: userId, contact_id: contactId, status }]);

    if (error) throw error;
    return data;
  }

  async getContacts(userId: string) {
    const { data, error } = await this.supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}
