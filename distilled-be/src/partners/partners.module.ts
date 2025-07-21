import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService],
  imports: [PrismaModule],
})
export class PartnersModule {}
