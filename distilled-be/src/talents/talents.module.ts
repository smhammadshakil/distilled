import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service.js';
import { TalentsController } from './talents.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [TalentsController],
  providers: [TalentsService],
  imports: [PrismaModule],
})
export class TalentsModule {}
