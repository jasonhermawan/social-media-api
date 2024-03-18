import { IsOptional, IsString } from 'class-validator';

export class GetPostsDto {
  @IsOptional()
  @IsString()
  readonly userid?: string;
}
