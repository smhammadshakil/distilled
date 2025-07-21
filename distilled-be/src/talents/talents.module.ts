import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TalentsController],
  providers: [TalentsService],
  imports: [PrismaModule],
})
export class TalentsModule {}
