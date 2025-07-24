import { ApiProperty } from '@nestjs/swagger';
import { Leads, LeadStatus } from '../../../generated/prisma';

export class LeadEntity implements Leads {
  @ApiProperty()
  id: string;

  @ApiProperty()
  partnerId: string;

  @ApiProperty({ required: false })
  note: string;

  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate: Date | null;

  @ApiProperty({
    required: false,
    description: 'File URL for contract with Distilled',
  })
  contractWithDistilled: string | null;

  @ApiProperty({ enum: LeadStatus })
  status: LeadStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  deletedAt: Date | null;

  @ApiProperty({ type: () => Object, required: false })
  partner?: any;

  @ApiProperty({ type: () => [Object], required: false })
  activeRequests?: any[];
}
