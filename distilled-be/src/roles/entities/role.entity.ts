import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../../generated/prisma';

export class RoleEntity implements Roles {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
