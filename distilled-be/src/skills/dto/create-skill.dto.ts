import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  name: string;
}
