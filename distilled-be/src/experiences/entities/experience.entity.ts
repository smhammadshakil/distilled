import { ApiProperty } from '@nestjs/swagger';
import { Experiences } from '../../../generated/prisma';

export class ExperienceEntity implements Experiences {
  @ApiProperty()
  id: string;

  @ApiProperty()
  talentId: string;

  @ApiProperty()
  company: string;

  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate: Date | null;

  @ApiProperty({ type: [String], description: 'Array of Skill IDs' })
  skills: string[];

  @ApiProperty({ type: [String], description: 'Array of Role IDs' })
  roles: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
