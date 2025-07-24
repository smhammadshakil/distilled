import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  imports: [PrismaModule],
})
export class LeadsModule {}
