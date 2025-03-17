import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  providers: [UploadsService, SupabaseService],
  exports: [UploadsService],
})
export class UploadsModule {}
