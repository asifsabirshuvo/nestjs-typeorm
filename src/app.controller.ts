import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'get a HELLO PING FROM SERVER' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
