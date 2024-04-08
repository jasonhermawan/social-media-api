import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'post-images'),
      serveRoot: '/post-images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'post-comment-images'),
      serveRoot: '/post-comment-images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'user-profile-images'),
      serveRoot: '/user-profile-images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'user-banner-images'),
      serveRoot: '/user-banner-images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
