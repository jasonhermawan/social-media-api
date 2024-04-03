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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
