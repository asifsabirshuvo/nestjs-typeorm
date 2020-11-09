import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Connection, getManager } from 'typeorm';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/createUserDto';
import { updateUserDto } from './dto/updateUserDto';
import { UpdateProfileSerializer } from './serializer/updateProfileSerializer';
import { Book } from './entities/book.entity';
import { parse } from 'path';

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

    await this.usersRepository.save(userdata);
    return userdata;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  //https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/
  //https://en.wikipedia.org/wiki/Isolation_%28database_systems%29#READ_UNCOMMITTED_.28dirty_reads.29
  async lockAndUpdate(amount: string): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    let currentBalance;
    await queryRunner.connect();
    await queryRunner.startTransaction("SERIALIZABLE"); //"READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";
    try {
     currentBalance =   await queryRunner.manager.getRepository(User).findOne({where: { id:1},select:["balance"]});

      await queryRunner.manager.getRepository(User).update({id:1},{balance: currentBalance.balance+parseInt(amount)});
      // await queryRunner.commitTransaction();

      console.log('comitted');

    } catch (err) {

      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();

    } finally {
      console.log('on final block');

      //making a synchronized delay
      let c = 0;
      while (c<3000000000) {
        c++
      }

        await queryRunner.commitTransaction();
        await queryRunner.release();
        console.log('done release');
        return {starting: currentBalance, ending: currentBalance.balance+parseInt(amount)}

        

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

  