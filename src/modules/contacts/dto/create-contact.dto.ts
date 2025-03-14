import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  contact_id: string;
}
