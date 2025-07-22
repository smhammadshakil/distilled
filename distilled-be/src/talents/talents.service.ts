import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto.js';
import { UpdateTalentDto } from './dto/update-talent.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TalentsService {
  constructor(private prisma: PrismaService) {}

  async create(createTalentDto: CreateTalentDto) {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.users.create({
        data: {
          email: createTalentDto.email,
          password: createTalentDto.password,
          userType: 'TALENT',
          activated: false,
        },
      });
      const talent = await prisma.talents.create({
        data: {
          fullName: createTalentDto.fullName,
          gender: createTalentDto.gender,
          status: createTalentDto.status,
          identityInfo: createTalentDto.identityInfo,
          address: createTalentDto.address,
          city: createTalentDto.city,
          country: createTalentDto.country,
          yearsOfExperience: createTalentDto.yearsOfExperience,
          readinessScore: createTalentDto.readinessScore,
          userId: user.id,
        },
      });
      return {
        email: user.email,
        userType: user.userType,
        activated: user.activated,
        ...talent,
      };
    });
  }

  findAll() {
    return this.prisma.talents.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.talents.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updateTalentDto: UpdateTalentDto) {
    return this.prisma.talents.update({
      where: { id },
      data: updateTalentDto,
    });
  }

  remove(id: string) {
    return this.prisma.talents.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
