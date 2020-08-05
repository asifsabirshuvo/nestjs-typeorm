import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './users/entities/user.entity'
import { UsersModule } from './users/ users.module';
import { ConfigModule } from '@nestjs/config';
import { Book } from './users/entities/book.entity';
import { Address } from './users/entities/address.entity';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      // entities: ["*/**/*.entity{.ts,.js}"],
      entities: [User,Book,Address],
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService], 

})




export class AppModule {}
