import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostCommentDto } from './dto/post-comment.dto';
import { GetPostCommentsDto } from './dto/get-post-comments.dto';

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

  async getPostComments(query: GetPostCommentsDto) {
    const { id, postid, userid } = query;
    const comments = await this.prisma.comment.findMany({
      where: {
        ...(id ? { id: Number(id) } : {}),
        ...(postid ? { postId: Number(postid) } : {}),
        ...(userid ? { userId: Number(userid) } : {}),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return comments;
  }

  async commentPost(
    token: string,
    postId: string,
    postCommentDto: PostCommentDto,
    picture?: any,
  ) {
    const tokenData = this.jwt.verify(token, {
      secret: process.env.SCRT_TKN,
    });
    if (postCommentDto.caption || picture) {
      const comment = await this.prisma.comment.create({
        data: {
          userId: tokenData.sub,
          postId: Number(postId),
          caption: postCommentDto.caption,
          ...(picture ? { picture: picture.filename } : {}),
        },
      });
      return comment;
    } else {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
