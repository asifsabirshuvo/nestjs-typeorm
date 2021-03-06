import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {

    // fullName
    @ApiProperty({
      example: 'John',
      description: 'First name of the user',
      format: 'string',
      minLength: 3,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly firstName: string;

    // Email
    @ApiProperty({
      example: 'Doe',
      description: 'Last name of the user',
      format: 'string',
      uniqueItems: false,
      minLength: 3,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly lastName: string;

  }
