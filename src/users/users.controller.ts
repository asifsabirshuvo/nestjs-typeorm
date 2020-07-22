import { Get, Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-one')
  async postUser(@Body() user: User): Promise<any> {
    return await this.usersService.createOne(user);
  }

  @Get('find-one')
  async findOneProfile(@Body() id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
  @Get('delete-one')
  // @ApiOperation({title: 'A private route for check the auth'})
  async deleteProfile(@Body() id: string): Promise<void> {
    return await this.usersService.remove(id);
  }

  @Get('all')
  // @ApiOperation({title: 'A private route for check the auth'})
  async getProfile(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
