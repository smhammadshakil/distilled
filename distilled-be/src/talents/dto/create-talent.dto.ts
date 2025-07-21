import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Gender, TalentStatus } from '../../../generated/prisma';

export class CreateTalentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  identityInfo: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  yearsOfExperience: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readinessScore: number;

  @IsNotEmpty()
  @ApiProperty()
  status: TalentStatus;
}
