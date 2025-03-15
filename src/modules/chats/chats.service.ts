import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Injectable()
export class ChatsService {
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  // Crear un chat
  async createChat(createChatDto: CreateChatDto) {
    const { is_group, name } = createChatDto;

    const { data, error } = await this.supabase
      .from('chats')
      .insert([{ is_group, name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMessagesByChat(chatId: string) {
    const { data, error } = await this.supabase
      .from('messages')
      .select('id, sender_id, content, created_at')
      .eq('chat_id', chatId);

    if (error) throw error;
    return data;
  }


  // Obtener los chats de un usuario
  async getChatsByUser(userId: string) {
    const { data, error } = await this.supabase
      .from('chat_members')
      .select('chat_id')
      .eq('user_id', userId);

    if (error) throw error;

    if (data && data.length > 0) {
      const chatIds = data.map((item) => item.chat_id);

      // Recuperar los detalles de los chats
      const { data: chats, error: chatError } = await this.supabase
        .from('chats')
        .select('id, name, is_group')
        .in('id', chatIds);

      if (chatError) throw chatError;
      return chats;
    }

    return []; // Si no tiene chats, devuelve un array vacío
  }

  // Obtener un chat por ID
  async getChatsById(id: string) {
    const { data, error } = await this.supabase
      .from('chats')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Obtener todos los chats
  async getAllChats() {
    const { data, error } = await this.supabase.from('chats').select('*');

    if (error) throw error;
    return data;
  }

  // Actualizar un chat
  async updateChat(id: string, updateChatDto: UpdateChatDto) {
    const { name } = updateChatDto;

    const { data, error } = await this.supabase
      .from('chats')
      .update({ name })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Eliminar un chat
  async deleteChat(id: string) {
    await this.supabase.from('chat_members').delete().eq('chat_id', id);

    const { error } = await this.supabase.from('chats').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Chat eliminado correctamente' };
  }

  // Agregar un miembro a un chat
  async addMember(addMemberDto: AddMemberDto) {
    const { chat_id, user_id } = addMemberDto;

    const { data, error } = await this.supabase
      .from('chat_members')
      .insert([{ chat_id, user_id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Obtener los miembros de un chat
  async getChatMembers(chat_id: string) {
    const { data, error } = await this.supabase
      .from('chat_members')
      .select('user_id, users!inner(id, username, avatar_url)')
      .eq('chat_id', chat_id);

    if (error) throw error;
    return data.map(member => ({
      id: member.users.id,
      username: member.users.username,
      avatar_url: member.users.avatar_url,
    }));
  }

  // Eliminar un miembro de un chat
  async removeMember(chat_id: string, user_id: string) {
    const { error } = await this.supabase
      .from('chat_members')
      .delete()
      .eq('chat_id', chat_id)
      .eq('user_id', user_id);

    if (error) throw error;
    return { message: 'Usuario eliminado del chat' };
  }
}
