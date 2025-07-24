import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(partnerId: string, createLeadDto: CreateLeadDto) {
    return this.prisma.leads.create({
      data: {
        ...createLeadDto,
        partnerId,
      },
      include: {
        partner: true,
        activeRequests: true,
      },
    });
  }

  findAll() {
    return this.prisma.leads.findMany({
      where: { deletedAt: null },
      include: {
        partner: true,
        activeRequests: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.leads.findUnique({
      where: { id, deletedAt: null },
      include: {
        partner: true,
        activeRequests: true,
      },
    });
  }

  update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.leads.update({
      where: { id },
      data: { ...updateLeadDto },
      include: {
        partner: true,
        activeRequests: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.leads.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
