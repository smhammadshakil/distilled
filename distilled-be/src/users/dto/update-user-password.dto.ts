import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
} from 'class-validator';
export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  @ApiProperty()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  @MaxLength(20)
  @MinLength(8)
  @ApiProperty()
  newPassword: string;
}
