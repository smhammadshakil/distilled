import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../../../generated/prisma/index.js';

export class CreateAdminDto {
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
}
