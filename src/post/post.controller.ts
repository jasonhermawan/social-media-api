import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostCommentDto } from './dto/post-comment.dto';
import { GetPostCommentsDto } from './dto/get-post-comments.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts(@Query() query: GetPostsDto) {
    return await this.postService.getPosts(query);
  }

  @UseGuards(JwtGuard)
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './post-images',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${suffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPost(
    @Headers() header,
    @Body() body: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const token = header.authorization.split(' ')[1];
    return await this.postService.createPost(token, body, file);
  }

  @Get('/comment')
  async getPostComments(@Query() query: GetPostCommentsDto) {
    return await this.postService.getPostComments(query);
  }

  @UseGuards(JwtGuard)
  @Post('/comment/:postid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './post-comment-images',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${suffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async commentPost(
    @Headers() header,
    @Param('postid') postId: string,
    @Body() body: PostCommentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const token = header.authorization.split(' ')[1];
    return await this.postService.commentPost(token, postId, body, file);
  }
}
