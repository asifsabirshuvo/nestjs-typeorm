import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateUserDto';
import { UpdateProfileSerializer } from './serializer/updateProfileSerializer';
import { Book } from './entities/book.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private connection: Connection

  ) { }

  //--------FIND ALL BOOKS OF A USER BY USER ID ------------//

  async findBooksByUserId(idOfUser: string): Promise<any> {
    const user = await this.usersRepository.find({
      relations: ['books', 'address'],
      where: { id: idOfUser },
    });
    console.log(user);
    return user;
  }

  async createOne(userdata: createUserDto): Promise<any> {
    if (!userdata.firstName) return 'firstname must be provided';
    if (!userdata.lastName) return 'lastname must be provided';

    // await this.usersRepository.save(userdata);
    const masterQueryRunner = this.connection.createQueryRunner("master");
    try {
      await this.connection.query('insert into user (firstName,lastName) Values("mike","mark")', [], masterQueryRunner);
    } finally {
      return masterQueryRunner.release();
    }
    return userdata;
  }

  async findAll(): Promise<User[]> {
    // return this.usersRepository.find();
    // await this.usersRepository.save(userdata);
    const masterQueryRunner = this.connection.createQueryRunner("slave");
    let data;
    try {
      data = await this.connection.query('select * from user', [], masterQueryRunner);
    } finally {
      masterQueryRunner.release();
      return data;
    }
  }

  async paginatedFindAll(page: number, qty: number): Promise<any> {
    const take = qty;
    const skip = page * qty;

    const [result, total] = await this.usersRepository.findAndCount({
      // where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
      select: ['firstName', 'lastName'],
      // order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async updateOne(user: updateUserDto): Promise<UpdateProfileSerializer> {
    const updatedUser = await this.usersRepository.update(user.id, user);
    console.log(updatedUser.affected);
    if (!updatedUser.affected) {
      throw new BadRequestException('User not found');
    }
    const foundUser = await this.usersRepository.findOne(user.id);

    return new UpdateProfileSerializer({ ...foundUser });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (user === undefined) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
