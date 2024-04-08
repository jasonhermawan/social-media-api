import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MulterModule.register({
      dest: './post-images',
    }),
    MulterModule.register({
      dest: './post-comment-images',
    }),
    JwtModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
