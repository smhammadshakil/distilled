import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

export const createAdmin = () => {
  const adminJs = new AdminJS({
    rootPath: '/admin',
    resources: [
      {
        resource: { model: prisma.users, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.admins, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.talents, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.resumes, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.experiences, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.certifications, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.partners, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.roles, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.skills, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.applications, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.leads, client: prisma },
        options: {},
      },
      {
        resource: { model: prisma.activeRequests, client: prisma },
        options: {},
      },
    ],
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJs);
  return { adminJs, adminRouter };
};
