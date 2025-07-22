import { ApiProperty } from '@nestjs/swagger';
import { Skills } from '../../../generated/prisma/index.js';

export class SkillEntity implements Skills {
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
