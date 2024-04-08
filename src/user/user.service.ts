import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersDto } from './dto/get-users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async getUsers(query: GetUsersDto) {
    const { id, uuid, email, username } = query;
    const users = await this.prisma.user.findMany({
      where: {
        ...(id ? { id: Number(id) } : {}),
        ...(uuid ? { uuid: uuid } : {}),
        ...(email ? { email: email } : {}),
        ...(username ? { username: username } : {}),
      },
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

  async updateUserProfilePicture(token: string, picture: any) {
    const tokenData = this.jwt.verify(token, {
      secret: process.env.SCRT_TKN,
    });

    const user = await this.prisma.user.update({
      where: {
        id: tokenData.sub,
      },
      data: {
        picture: picture.filename,
      },
    });
    return user;
  }

  async updateUserBannerPicture(token: string, banner: any) {
    const tokenData = this.jwt.verify(token, {
      secret: process.env.SCRT_TKN,
    });

    const user = await this.prisma.user.update({
      where: {
        id: tokenData.sub,
      },
      data: {
        banner: banner.filename,
      },
    });
    return user;
  }
}
