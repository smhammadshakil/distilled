import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { LeadStatus } from '../../../generated/prisma';

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  note?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'File URL for contract with Distilled',
  })
  contractWithDistilled?: string;

  @IsOptional()
  @ApiProperty({ enum: LeadStatus, required: false })
  status?: LeadStatus;
}
