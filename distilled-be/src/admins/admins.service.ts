import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { UpdateAdminDto } from './dto/update-admin.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.users.create({
        data: {
          email: createAdminDto.email,
          password: createAdminDto.password,
          userType: 'ADMIN',
          activated: false,
        },
      });
      const admin = await prisma.admins.create({
        data: {
          fullName: createAdminDto.fullName,
          gender: createAdminDto.gender,
          userId: user.id,
        },
      });
      return {
        email: user.email,
        userType: user.userType,
        activated: user.activated,
        ...admin,
      };
    });
  }

  findAll() {
    return this.prisma.admins.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.admins.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admins.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  remove(id: string) {
    return this.prisma.admins.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
