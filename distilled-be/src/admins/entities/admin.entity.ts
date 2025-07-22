import { ApiProperty } from '@nestjs/swagger';
import { Admins, Gender, UserType } from '../../../generated/prisma/index.js';

export class AdminEntity implements Admins {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  gender: Gender;

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
