import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MulterModule.register({
      dest: './user-profile-images',
    }),
    MulterModule.register({
      dest: './user-banner-images',
    }),
    JwtModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
