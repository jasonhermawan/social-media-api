import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async getPosts(query: GetPostsDto) {
    const { userid, id } = query;
    const posts = await this.prisma.post.findMany({
      where: {
        ...(id ? { id: Number(id) } : {}),
        ...(userid ? { userId: Number(userid) } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  async createPost(token: string, createPostDto: CreatePostDto, picture?: any) {
    const tokenData = this.jwt.verify(token, {
      secret: process.env.SCRT_TKN,
    });
    if (createPostDto.caption || picture) {
      const post = await this.prisma.post.create({
        data: {
          uuid: uuidv4(),
          userId: tokenData.sub,
          caption: createPostDto.caption,
          ...(picture ? { picture: picture.filename } : {}),
        },
      });
      return post;
    } else {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
