import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async addContact(createContactDto: CreateContactDto) {
    const { user_id, contact_id } = createContactDto;

    const { data, error } = await this.supabase
      .from('contacts')
      .insert([{ user_id, contact_id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getContacts(user_id: string) {
    const { data, error } = await this.supabase
      .from('contacts')
      .select('id, contact_id, status, created_at, users:contact_id (id, username, avatar_url)')
      .eq('user_id', user_id);

    if (error) throw error;

    return data.map(contact => ({
      id: contact.id,
      contact_id: contact.contact_id,
      status: contact.status,
      created_at: contact.created_at,
      username: contact.users.username,
      avatar_url: contact.users.avatar_url,
    }));
  }

  async updateContact(id: string, updateContactDto: UpdateContactDto) {
    const { status } = updateContactDto;

    const { data, error } = await this.supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteContact(id: string) {
    const { error } = await this.supabase.from('contacts').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Contacto eliminado' };
  }
}
