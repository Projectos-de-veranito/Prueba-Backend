import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddUploadDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  chat_id: string;

  @IsString()
  @IsNotEmpty()
  file_url: string;

  @IsString()
  @IsNotEmpty()
  file_type: string;
}
