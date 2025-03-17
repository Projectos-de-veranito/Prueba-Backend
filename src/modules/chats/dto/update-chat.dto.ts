import { IsString, IsOptional } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsString()
  name?: string;
}
