import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: GetUsersDto) {
    const users = await this.prisma.user.findMany({
      where: query,
    });
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
      },
    });
    return user;
  }
}
