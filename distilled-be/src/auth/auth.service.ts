import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(email: string, password: string) {
    const existing = await this.prisma.users.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.users.create({
      data: {
        email,
        password: hash,
        isEmailVerified: false,
        userType: 'TALENT',
        activated: false,
        emailVerificationToken: Math.random().toString(36).substring(2), // Use a better token in prod!
      },
    });
    console.log('new user', user);
    // TODO: Send verification email with the token
    return { message: 'User created. Please verify your email.' };
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    // if (!user.isEmailVerified)
    //   throw new UnauthorizedException('Email not verified');
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.users.findFirst({
      where: { emailVerificationToken: token },
    });
    if (!user) throw new BadRequestException('Invalid token');
    await this.prisma.users.update({
      where: { id: user.id },
      data: { isEmailVerified: true, emailVerificationToken: null },
    });
    return { message: 'Email verified successfully.' };
  }
}
