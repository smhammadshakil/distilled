import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}
  async create(id: string, createExperienceDto: CreateExperienceDto) {
    const { skills, roles, ...rest } = createExperienceDto;
    const talent = await this.prisma.talents.findUnique({
      where: { userId: id },
    });
    if (!talent) {
      throw new Error('Talent not found for the given user ID');
    }
    return this.prisma.experiences.create({
      data: {
        ...rest,
        talentId: talent.id,
        skills: {
          connect: skills.map((id) => ({ id })),
        },
        roles: {
          connect: roles.map((id) => ({ id })),
        },
      },
      include: {
        skills: true,
        roles: true,
      },
    });
  }

  findAll() {
    return this.prisma.experiences.findMany({
      where: { deletedAt: null },
      include: {
        skills: true,
        roles: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.experiences.findUnique({
      where: { id, deletedAt: null },
      include: {
        skills: true,
        roles: true,
      },
    });
  }

  update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const { skills, roles, ...rest } = updateExperienceDto;
    return this.prisma.experiences.update({
      where: { id },
      data: {
        ...rest,
        ...(skills && {
          skills: {
            set: skills.map((skillId) => ({ id: skillId })),
          },
        }),
        ...(roles && {
          roles: {
            set: roles.map((roleId) => ({ id: roleId })),
          },
        }),
      },
      include: {
        skills: true,
        roles: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.experiences.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
