import { Injectable, BadRequestException }from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,  DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateUserDto';
import {UpdateProfileSerializer} from './serializer/updateProfileSerializer'
import { Book } from './entities/book.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  //--------FIND ALL BOOKS OF A USER BY USER ID ------------//
 
  
  async findBooksByUserId(idOfUser: string): Promise<any> {

    const user = await this.usersRepository.find({
      relations: ["books","address"],
      where: { id: idOfUser }
    });
    console.log(user)
    return user;

  }



  async createOne(userdata: createUserDto): Promise<any> {
    if (!userdata.firstName) return 'firstname must be provided';
    if (!userdata.lastName) return 'lastname must be provided';

    await this.usersRepository.save(userdata);
    return userdata;

  }

  findAll(): Promise<User[]> {
    
    return this.usersRepository.find();

  }

  async updateOne(user: updateUserDto): Promise<UpdateProfileSerializer> {
   
    const updatedUser = await this.usersRepository.update(user.id, user);
    console.log(updatedUser.affected)
    if (!updatedUser.affected) {
      throw new BadRequestException('User not found');
    }
    const foundUser = await this.usersRepository.findOne(user.id);

    return new UpdateProfileSerializer({...foundUser});

  }

  async findOne(id: string): Promise<User> {

    const user =  await this.usersRepository.findOne(id);
    if (user === undefined) {
      throw new BadRequestException('User not found');
    }

    return user;
  }



  

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
