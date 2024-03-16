import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const user = await this.authService.register(body);
    return { user };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.login(body);
    return { user };
  }
}
