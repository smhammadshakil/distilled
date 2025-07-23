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
import { ResumesModule } from './resumes/resumes.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { CertificationsModule } from './certifications/certifications.module';
import { ApplicationsModule } from './applications/applications.module';
import { LeadsModule } from './leads/leads.module';
import { ActiveRequestsModule } from './active-requests/active-requests.module';

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
    ResumesModule,
    ExperiencesModule,
    CertificationsModule,
    ApplicationsModule,
    LeadsModule,
    ActiveRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
