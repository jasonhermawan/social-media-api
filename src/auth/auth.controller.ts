import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
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

  @Get('verify-token')
  async verifyToken(@Headers() header) {
    const token = header.authorization.split(' ')[1];
    return await this.authService.verifyToken(token);
  }
}
