import { Get, Controller, Post, Body, Put, Param,ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';
import { createUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateUserDto';
import { idDto } from './dto/idDto';
import {UpdateProfileSerializer} from './serializer/updateProfileSerializer'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'adding user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('add-one')
  async postUser(@Body() user: createUserDto): Promise<any> {
    return await this.usersService.createOne(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'finding user from body' })
  @Post('find-one')
  async findOneProfile(@Body() userId: idDto): Promise<User> {
    return await this.usersService.findOne(userId.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'finding user from url params' })
  @Post('find-one/:id')
  async findOnemProfile(@Param('id') userId: idDto): Promise<User> {
    return await this.usersService.findOne(userId.id);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'updating user from body data' })
  @Put('update-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async updateProfile(@Body() user: updateUserDto): Promise<UpdateProfileSerializer>  {
    return await this.usersService.updateOne(user);
  }

  @ApiOperation({ summary: 'deleting user from body data' })
  @Post('delete-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async deleteProfile(@Body() id: string): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'getting all users' })
  @Get('all')
  // @ApiOperation({title: 'A private route for check the auth'})
  async getProfile(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
