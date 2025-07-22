import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service.js';
import { AdminsController } from './admins.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [PrismaModule],
})
export class AdminsModule {}
