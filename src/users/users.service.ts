import { Injectable }from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';
import { userDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(userdata: userDto): Promise<any> {
    if (!userdata.firstName) return 'firstname must be provided';
    if (!userdata.lastName) return 'lastname must be provided';

    await this.usersRepository.save(userdata);

    return userdata;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateOne(user: User): Promise<UpdateResult> {
    return await this.usersRepository.update(user.id, user);
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
