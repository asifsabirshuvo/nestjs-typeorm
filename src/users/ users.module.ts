
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { Address } from './entities/address.entity';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([User, Book,Address])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}