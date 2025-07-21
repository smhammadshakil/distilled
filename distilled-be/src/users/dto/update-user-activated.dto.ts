import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';
export class UpdateUserActivatedDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ default: false })
  activated: boolean;
}
