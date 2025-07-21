import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { TalentsModule } from './talents/talents.module';
import { PartnersModule } from './partners/partners.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    SkillsModule,
    RolesModule,
    AuthModule,
    TalentsModule,
    PartnersModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
