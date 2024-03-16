import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const { username, email, password } = registerDTO;

    const isUserExist = await this.prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (isUserExist) {
      throw new UnprocessableEntityException(
        'Email or username already exists',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        uuid: uuidv4(),
        username,
        email,
        password: hashPassword,
        isVerified: false,
      },
    });

    return user;
  }

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Password incorrect');
    }

    const token = this.signToken(user.id, email);
    return {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      token: (await token).toString(),
    };
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.SCRT_TKN,
    });
  }
}
