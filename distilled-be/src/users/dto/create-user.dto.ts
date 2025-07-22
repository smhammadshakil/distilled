import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserType } from '../../../generated/prisma/index.js';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  userType: UserType;
}
