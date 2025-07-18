import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  create(createSkillDto: CreateSkillDto) {
    return this.prisma.skills.create({
      data: createSkillDto,
    });
  }

  findAll() {
    return this.prisma.skills.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.skills.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.prisma.skills.update({
      where: { id },
      data: updateSkillDto,
    });
  }

  remove(id: string) {
    return this.prisma.skills.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
