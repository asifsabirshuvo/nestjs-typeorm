import { Get, Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'adding user' })
  @Post('add-one')
  async postUser(@Body() user: userDto): Promise<any> {
    return await this.usersService.createOne(user);
  }

  @ApiOperation({ summary: 'finding user from body' })
  @Post('find-one')
  async findOneProfile(@Body() id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'finding user from url params' })
  @Post('find-one/:id')
  async findOnemProfile(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
  
  @ApiOperation({ summary: 'updating user from body data' })
  @Put('update-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async updateProfile(@Body() user: User): Promise<UpdateResult> {
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
