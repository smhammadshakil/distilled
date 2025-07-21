import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../../../generated/prisma';

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;
}
