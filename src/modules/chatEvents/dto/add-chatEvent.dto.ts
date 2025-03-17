import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class AddChatEventDto {
  @IsUUID()
  @IsNotEmpty()
  chat_id: string;

  @IsString()
  @IsNotEmpty()
  event_type: string;

  @IsUUID()
  @IsOptional()
  message_id?: string;

  @IsUUID()
  @IsNotEmpty()
  created_by: string;
}