import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SCRT_TKN,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const userData = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete userData.password;
    return userData;
  }
}
