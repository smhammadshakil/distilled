/*
  Warnings:

  - You are about to drop the `ActiveRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Certification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Talent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActiveRequest" DROP CONSTRAINT "ActiveRequest_leadId_fkey";

-- DropForeignKey
ALTER TABLE "ActiveRequest" DROP CONSTRAINT "ActiveRequest_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "ActiveRequest" DROP CONSTRAINT "ActiveRequest_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_userId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceRoles" DROP CONSTRAINT "_ExperienceRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceRoles" DROP CONSTRAINT "_ExperienceRoles_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceSkills" DROP CONSTRAINT "_ExperienceSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceSkills" DROP CONSTRAINT "_ExperienceSkills_B_fkey";

-- DropTable
DROP TABLE "ActiveRequest";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Certification";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "Partner";

-- DropTable
DROP TABLE "Resume";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "Talent";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "linkedIn" TEXT,
    "phoneNumber" TEXT,
    "website" TEXT,
    "shortIntro" TEXT,
    "deactivated" "Deactivated" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender",
    "identityInfo" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "yearsOfExperience" INTEGER,
    "readinessScore" DOUBLE PRECISION,
    "status" "TalentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resumes" (
    "id" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiences" (
    "id" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certifications" (
    "id" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partners" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "industry" TEXT,
    "preferredTimeZone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "notes" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "contractWithDistilled" TEXT,
    "status" "ApplicationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "note" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "contractWithDistilled" TEXT,
    "status" "LeadStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveRequests" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "ActiveRequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ActiveRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_userId_key" ON "Admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Talents_userId_key" ON "Talents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_userId_key" ON "Partners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "Skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talents" ADD CONSTRAINT "Talents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiences" ADD CONSTRAINT "Experiences_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leads" ADD CONSTRAINT "Leads_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveRequests" ADD CONSTRAINT "ActiveRequests_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveRequests" ADD CONSTRAINT "ActiveRequests_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveRequests" ADD CONSTRAINT "ActiveRequests_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceSkills" ADD CONSTRAINT "_ExperienceSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceSkills" ADD CONSTRAINT "_ExperienceSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceRoles" ADD CONSTRAINT "_ExperienceRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceRoles" ADD CONSTRAINT "_ExperienceRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
