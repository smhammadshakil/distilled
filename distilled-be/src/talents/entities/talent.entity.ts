import { ApiProperty } from '@nestjs/swagger';
import {
  Talents,
  Gender,
  UserType,
  TalentStatus,
} from '../../../generated/prisma/index.js';

export class TalentEntity implements Talents {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  identityInfo: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  yearsOfExperience: number;

  @ApiProperty()
  readinessScore: number;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  status: TalentStatus;

  password: string;

  @ApiProperty()
  userType: UserType;

  @ApiProperty({ default: false })
  activated: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
