import { IsOptional, IsString } from 'class-validator';

export class PostCommentDto {
  @IsOptional()
  @IsString()
  readonly caption?: string;
}
