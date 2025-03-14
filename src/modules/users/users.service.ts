  import { Injectable } from '@nestjs/common';
  import { SupabaseService } from '../../supabase/supabase.service';
  import * as bcrypt from 'bcrypt';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { CreateUserDto } from './dto/create-user.dto';

  @Injectable()
  export class UsersService {
    private supabase;

    constructor(private readonly supabaseService: SupabaseService) {
      this.supabase = this.supabaseService.getClient();
    }

    async createUser(createUserDto: CreateUserDto) {
      const { email, username, password, avatar_url } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const { data, error } = await this.supabase
        .from('users')
        .insert([{ email, password: hashedPassword, username, avatar_url }])
        .select()
        .single();
    
      if (error) throw error;
      return data;
    }
    

    async getUserById(id: string) {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }

    async getUserByEmail(email: string) {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data;
    }

    async getUserContacts(userId: string) {
      const { data, error } = await this.supabase
        .from('contacts')
        .select(`
          contact_id,
          users:contact_id (id, username, avatar_url)
        `)
        .eq('user_id', userId)
        .eq('status', 'accepted');
    
      if (error) throw error;
    
      return data.map((contact) => ({
        id: contact.users.id,
        username: contact.users.username,
        avatar_url: contact.users.avatar_url,
      }));
    }
    

    async updateUser(id: string, updateData: UpdateUserDto) {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const { data, error } = await this.supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
