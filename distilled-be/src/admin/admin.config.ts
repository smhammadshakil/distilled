import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import PrismaModule from '../../generated/prisma/index.js';
// import { AdminEntity } from '../admins/entities/admin.entity.js';

const prisma = new PrismaModule.PrismaClient();

AdminJS.registerAdapter({ Database, Resource });
// Adapter test
try {
  // new Database({ client: prisma });
  // console.log('prrrisma', prisma);
  // new Resource({
  //   model: prisma.users,
  //   client: prisma,
  //   clientModule: PrismaModule,
  // });
  console.log('✅ AdminJS Prisma adapter is registered and working.');
} catch (err) {
  console.error('❌ AdminJS Prisma adapter is NOT working:', err);
}
const modelNames = Object.keys(PrismaModule.Prisma.dmmf.datamodel.models).map(
  // eslint-disable-next-line
  (model) => PrismaModule.Prisma.dmmf.datamodel.models[model].name
);
console.log('Available Prisma models:', modelNames);
export const createAdmin = () => {
  const adminJs = new AdminJS({
    rootPath: '/admin',
    resources: modelNames.map((modelName) => ({
      resource: {
        // eslint-disable-next-line
        model: getModelByName(modelName, PrismaModule),
        client: prisma,
        clientModule: PrismaModule,
      },
      options: {},
    })),
    // resources: [
    //   {
    //     resource: {
    //       model: prisma.users,
    //       client: prisma,
    //       clientModule: PrismaModule,
    //     },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.admins, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.talents, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.resumes, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.experiences, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.certifications, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.partners, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.roles, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.skills, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.applications, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.leads, client: prisma },
    //     options: {},
    //   },
    //   {
    //     resource: { model: prisma.activeRequests, client: prisma },
    //     options: {},
    //   },
    // ],
    // resources: [
    // resources: [
    // {
    //   resource: AdminEntity,
    //   options: {
    //     // or you can provide an object with your custom resource options
    //     id: 'profiles', // here the resource identifier has been renamed to "profiles"
    //   },
    // },
    // {
    //   resource: {
    //     // eslint-disable-next-line
    //     model: getModelByName('Users', PrismaModule),
    //     client: prisma,
    //     clientModule: PrismaModule,
    //   },
    //   options: {},
    // },
    // {
    //   // resource: {
    //   //   // eslint-disable-next-line
    //   //   model: getModelByName('Users'),
    //   //   client: prisma,
    //   //   // clientModule: PrismaModule,
    //   // },
    //   resource: prisma.users,
    //   options: {},
    // },
    // { resource: { model: 'Users', client: prisma }, options: {} },
    // { resource: { model: 'Admins', client: prisma }, options: {} },
    // { resource: { model: 'Talents', client: prisma }, options: {} },
    // { resource: { model: 'Resumes', client: prisma }, options: {} },
    // { resource: { model: 'Experiences', client: prisma }, options: {} },
    // { resource: { model: 'Certifications', client: prisma }, options: {} },
    // { resource: { model: 'Partners', client: prisma }, options: {} },
    // { resource: { model: 'Roles', client: prisma }, options: {} },
    // { resource: { model: 'Skills', client: prisma }, options: {} },
    // { resource: { model: 'Applications', client: prisma }, options: {} },
    // { resource: { model: 'Leads', client: prisma }, options: {} },
    // { resource: { model: 'ActiveRequests', client: prisma }, options: {} },
    // ],
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJs);
  return { adminJs, adminRouter };
};

// resources: [
//   {
//     // resource: {
//     //   // eslint-disable-next-line
//     //   model: getModelByName('Users'),
//     //   client: prisma,
//     //   // clientModule: PrismaModule,
//     // },
//     resource: prisma.users,
//     options: {},
//   },
//   // { resource: { model: 'Users', client: prisma }, options: {} },
//   // { resource: { model: 'Admins', client: prisma }, options: {} },
//   // { resource: { model: 'Talents', client: prisma }, options: {} },
//   // { resource: { model: 'Resumes', client: prisma }, options: {} },
//   // { resource: { model: 'Experiences', client: prisma }, options: {} },
//   // { resource: { model: 'Certifications', client: prisma }, options: {} },
//   // { resource: { model: 'Partners', client: prisma }, options: {} },
//   // { resource: { model: 'Roles', client: prisma }, options: {} },
//   // { resource: { model: 'Skills', client: prisma }, options: {} },
//   // { resource: { model: 'Applications', client: prisma }, options: {} },
//   // { resource: { model: 'Leads', client: prisma }, options: {} },
//   // { resource: { model: 'ActiveRequests', client: prisma }, options: {} },
// ],
