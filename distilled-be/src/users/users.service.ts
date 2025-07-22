import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        userType: createUserDto.userType,
        activated: false,
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.users.findFirst({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error('Old password is incorrect');
    const hash = await bcrypt.hash(newPassword, 10);
    return this.prisma.users.update({
      where: { id },
      data: { password: hash },
    });
  }

  async setActivated(id: string, activated: boolean) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.users.update({
      where: { id },
      data: { activated },
    });
  }
}
