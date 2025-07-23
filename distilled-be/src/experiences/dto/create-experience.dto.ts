import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  company: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String, format: 'date-time' })
  startDate: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate?: string;

  @IsNotEmpty()
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: [String], description: 'Array of Skill IDs' })
  skills: string[];

  @IsNotEmpty()
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: [String], description: 'Array of Role IDs' })
  roles: string[];
}
