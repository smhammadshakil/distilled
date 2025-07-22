import { Module } from '@nestjs/common';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import { PrismaClient } from '../../generated/prisma/index.js';
import { Database, Resource } from '@adminjs/prisma';

const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      useFactory: () => {
        const adminJs = new AdminJS({
          rootPath: '/admin',
          resources: [
            {
              resource: prisma.skills, // ✅ Corrected here
              options: {},
            },
          ],
        });

        const adminRouter = AdminJSExpress.buildRouter(adminJs);

        return {
          adminJs,
          adminJsOptions: adminJs.options,
          adminRouter,
        };
      },
    }),
  ],
  providers: [],
})
export class AdminModule {}
