import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetUsersDto } from './dto/get-users.dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async getUsers(@Query() query: GetUsersDto) {
    return await this.userService.getUsers(query);
  }

  @Get('/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }
}
