import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  linkedIn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  website: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @ApiProperty()
  shortIntro: string;
}
