import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { LeadStatus } from '../../../generated/prisma';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partnerId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ required: false })
  note?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ enum: LeadStatus })
  status: LeadStatus;
}
