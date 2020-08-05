import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class idDto {
    
  // id
  @ApiProperty({
    example: '1',
    description: 'id of the user',
    format: 'string'
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
