import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsOptional()
  @IsString()
  readonly uuid?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly username?: string;
}
