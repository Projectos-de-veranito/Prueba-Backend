import { IsString } from 'class-validator';

export class UpdateContactDto {
  @IsString()
  status: 'pending' | 'accepted' | 'blocked';
}
