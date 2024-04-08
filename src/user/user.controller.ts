import {
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUsersDto } from './dto/get-users.dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtGuard)
  @Get('/')
  async getUsers(@Query() query: GetUsersDto) {
    return await this.userService.getUsers(query);
  }

  @Get('/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Patch('/profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './user-profile-images',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${suffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async updateUserProfilePicture(
    @Headers() header,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = header.authorization.split(' ')[1];
    return await this.userService.updateUserProfilePicture(token, file);
  }

  @Patch('/banner-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './user-banner-images',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${suffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async updateUserBannerPicture(
    @Headers() header,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = header.authorization.split(' ')[1];
    return await this.userService.updateUserBannerPicture(token, file);
  }
}
