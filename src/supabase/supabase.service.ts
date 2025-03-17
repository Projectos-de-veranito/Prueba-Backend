import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async uploadFile(bucket: string, filePath: string, file: Buffer, contentType: string): Promise<string | null> {
    const { data, error } = await this.supabase.storage.from(bucket).upload(filePath, file, {
      contentType,
      upsert: false,
    });
  
    if (error) {
      console.error("Error al subir archivo a Supabase:", error);
      return null;
    }
  
    return data?.path ? `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}` : null;
  }
  
}
