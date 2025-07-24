import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from '../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(email: string, password: string, userType: UserType) {
    const existing = await this.prisma.users.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          email,
          password: hash,
          isEmailVerified: false,
          userType,
          activated: false,
        },
      });

      let profile: any = {};

      if (userType === 'ADMIN') {
        profile = await tx.admins.create({
          data: {
            userId: user.id,
            fullName: '',
          },
        });
      } else if (userType === 'TALENT') {
        profile = await tx.talents.create({
          data: {
            userId: user.id,
            fullName: '',
            status: 'BENCH',
          },
        });
      } else if (userType === 'PARTNER') {
        const partner = await tx.partners.create({
          data: {
            userId: user.id,
            companyName: '',
            contactPersonName: '',
          },
        });
        // Create an initial lead for the partner
        await tx.leads.create({
          data: {
            partnerId: partner.id,
            startDate: new Date(),
            status: 'LEAD',
          },
        });
        profile = partner;
      } else {
        throw new BadRequestException('Invalid user type');
      }

      // Generate and save email verification token
      const jwtPayload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(jwtPayload);
      await tx.users.update({
        where: { id: user.id },
        data: { emailVerificationToken: token },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { access_token: token, user, profile };
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    if (!user.isEmailVerified)
      throw new UnauthorizedException('Email not verified');
    const jwtPayload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(jwtPayload),
      email: user.email,
      id: user.id,
    };
  }

  async verifyEmail(token: string) {
    let payload: { email: string; id: string };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new NotFoundException('Invalid or expired token');
    }
    const email: string = payload.email;
    const user = await this.prisma.users.findFirst({
      where: { email },
    });
    if (!user) throw new BadRequestException('Invalid token');
    await this.prisma.users.update({
      where: { id: user.id },
      data: { isEmailVerified: true, emailVerificationToken: null },
    });
    const jwtPayload = { id: user.id, email: user.email };
    return { access_token: this.jwtService.sign(jwtPayload) };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    await this.prisma.users.update({
      where: { id: user.id },
      data: { emailVerificationToken: token },
    });
    // TODO: Send token via email to user
    // TODO: We will remove token from here and it will be sent into email later
    return { message: 'Password reset token generated', token };
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: { email: string; id: string };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new NotFoundException('Invalid or expired token');
    }
    const email: string = payload.email;
    const user = await this.prisma.users.findFirst({
      where: { email },
    });
    if (!user) throw new NotFoundException('Invalid or expired token');
    const hash = await bcrypt.hash(newPassword, 10);
    await this.prisma.users.update({
      where: { id: user.id },
      data: { password: hash, emailVerificationToken: null },
    });
    return { message: 'Password has been reset successfully.' };
  }

  async requestVerifyEmail(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    // TODO: Send verification email with the token
    const jwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(jwtPayload);
    await this.prisma.users.update({
      where: { id: user.id },
      data: { emailVerificationToken: token },
    });
    return { message: `Email sent to ${user.email}` };
  }
}
