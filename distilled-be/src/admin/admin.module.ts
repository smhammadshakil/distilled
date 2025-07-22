import { Module } from '@nestjs/common';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import { createAdmin } from './admin.config.js';

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      useFactory: () => {
        const { adminJs, adminRouter } = createAdmin();
        return {
          adminJs,
          adminJsOptions: adminJs.options,
          adminRouter,
        };
      },
    }),
  ],
})
export class AdminModule {}
