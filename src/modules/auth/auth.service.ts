import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabaseService.getClient().auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async getUser(token: string) {
    const { data, error } = await this.supabaseService.getClient().auth.getUser(token);

    if (error) throw new Error(error.message);
    return data;
  }

  async signOut() {
    const { error } = await this.supabaseService.getClient().auth.signOut();
    
    if (error) throw new Error(error.message);
    return { message: 'Sesión cerrada correctamente' };
  }
}
