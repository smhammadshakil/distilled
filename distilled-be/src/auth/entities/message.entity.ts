import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity {
  @ApiProperty()
  message: string;
}
