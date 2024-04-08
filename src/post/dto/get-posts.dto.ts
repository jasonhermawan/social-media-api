import { IsOptional, IsString } from 'class-validator';

export class GetPostsDto {
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly userid?: string;
}
