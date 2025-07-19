import { ApiProperty } from '@nestjs/swagger';
import { Users, UserType } from '../../../generated/prisma';

export class UserEntity implements Users {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  userType: UserType;

  @ApiProperty()
  linkedIn: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  shortIntro: string;

  @ApiProperty({ default: false })
  activated: boolean;

  @ApiProperty({ default: false })
  isEmailVerified: boolean;

  @ApiProperty()
  emailVerificationToken: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
