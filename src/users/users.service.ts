import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from './user.entity';
  import { from } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}
                                                                                                                                 
  async createOne(userdata: User): Promise<any> {
       
    if (!userdata.firstName)
      return "firstname must be provided"
      if (!userdata.lastName)
      return "lastname must be provided"

      await this.usersRepository.save(userdata);
  
    return userdata;
    

  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}