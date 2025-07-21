import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.users.create({
        data: {
          email: createPartnerDto.email,
          password: createPartnerDto.password,
          userType: 'PARTNER',
          activated: false,
        },
      });
      const partner = await prisma.partners.create({
        data: {
          companyName: createPartnerDto.companyName,
          contactPersonName: createPartnerDto.contactPersonName,
          industry: createPartnerDto.industry,
          preferredTimeZone: createPartnerDto.preferredTimeZone,
          userId: user.id,
        },
      });
      return {
        email: user.email,
        userType: user.userType,
        activated: user.activated,
        ...partner,
      };
    });
  }

  findAll() {
    return this.prisma.partners.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.partners.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updatePartnerDto: UpdatePartnerDto) {
    return this.prisma.partners.update({
      where: { id },
      data: updatePartnerDto,
    });
  }

  remove(id: string) {
    return this.prisma.partners.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
