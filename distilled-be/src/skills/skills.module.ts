import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [PrismaModule],
})
export class SkillsModule {}
