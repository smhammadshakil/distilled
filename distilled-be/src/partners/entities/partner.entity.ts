import { ApiProperty } from '@nestjs/swagger';
import { Gender, Partners, UserType } from '../../../generated/prisma';

export class PartnerEntity implements Partners {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  contactPersonName: string;

  @ApiProperty()
  industry: string;

  @ApiProperty()
  preferredTimeZone: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  userType: UserType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
