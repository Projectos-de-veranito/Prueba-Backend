import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsBoolean()
  is_group: boolean;

  @IsOptional()
  @IsString()
  name?: string;
}
