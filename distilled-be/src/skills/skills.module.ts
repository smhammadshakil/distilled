import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service.js';
import { SkillsController } from './skills.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [PrismaModule],
})
export class SkillsModule {}
