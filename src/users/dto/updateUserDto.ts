import { IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
    
  // id
  @ApiProperty({
    example: '1',
    description: 'id name of the user',
    format: 'number'
  })
  @IsNotEmpty()
  @IsString()
  readonly id: number;

  // fullName
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    format: 'string',
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly firstName: string;

  // Email
  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    format: 'string',
    uniqueItems: false,
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly lastName: string;
}
