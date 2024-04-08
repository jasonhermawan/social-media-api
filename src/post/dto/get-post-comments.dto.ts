import { IsOptional, IsString } from 'class-validator';

export class GetPostCommentsDto {
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  readonly postid?: string;

  @IsOptional()
  @IsString()
  readonly userid?: string;
}
