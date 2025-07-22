import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { SkillsModule } from './skills/skills.module.js';
import { RolesModule } from './roles/roles.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TalentsModule } from './talents/talents.module.js';
import { PartnersModule } from './partners/partners.module.js';
import { AdminsModule } from './admins/admins.module.js';
import { AdminModule } from './admin/admin.module.js';

@Module({
  imports: [
    AdminModule,
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
