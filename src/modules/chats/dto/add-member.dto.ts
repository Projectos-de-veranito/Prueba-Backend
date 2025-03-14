import { IsUUID } from 'class-validator';

export class AddMemberDto {
  @IsUUID()
  chat_id: string;

  @IsUUID()
  user_id: string;
}
