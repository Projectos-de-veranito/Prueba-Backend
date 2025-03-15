import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AddUploadDto } from './dto/add-upload.dto';

@Injectable()
export class UploadsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadFile(file: Express.Multer.File, user_id: string, chat_id: string) {
    const supabase = this.supabaseService.getClient(); // Obtener el cliente de Supabase

    const filePath = `uploads/${chat_id}/${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage.from('uploads').upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

    if (error) throw new Error(`Error al subir archivo: ${error.message}`);

    const file_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;
    const file_type = file.mimetype;

    return this.saveFile({ user_id, chat_id, file_url, file_type });
  }

  async saveFile(uploadDto: AddUploadDto) {
    const supabase = this.supabaseService.getClient(); // Obtener el cliente de Supabase

    const { data, error } = await supabase.from('uploads').insert([uploadDto]);

    if (error) throw new Error(`Error al guardar archivo: ${error.message}`);

    return data;
  }

  async getFilesByChat(chat_id: string) {
    const supabase = this.supabaseService.getClient(); // Obtener el cliente de Supabase

    const { data, error } = await supabase.from('uploads').select('*').eq('chat_id', chat_id);

    if (error) throw new Error(`Error al obtener archivos: ${error.message}`);

    return data;
  }
}
