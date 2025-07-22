import { Module } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { RolesController } from './roles.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}
