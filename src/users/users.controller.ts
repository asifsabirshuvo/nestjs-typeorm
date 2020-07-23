import { Get, Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-one')
  async postUser(@Body() user: User): Promise<any> {
    return await this.usersService.createOne(user);
  }

  @Post('find-one')
  async findOneProfile(@Body() id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Post('find-one/:id')
  async findOnemProfile(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Put('update-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async updateProfile(@Body() user: User): Promise<UpdateResult> {
    return await this.usersService.updateOne(user);
  }

  @Post('delete-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async deleteProfile(@Body() id: string): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }

  @Get('all')
  // @ApiOperation({title: 'A private route for check the auth'})
  async getProfile(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
