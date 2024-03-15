import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return 'register';
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO) {
    return 'login';
  }
}
