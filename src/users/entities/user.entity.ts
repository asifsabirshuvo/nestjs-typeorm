
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Book } from './book.entity';
import { Address } from './address.entity';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  balance: number;


  @OneToOne(type => Address, address => address.user)
  address: Address;

  @OneToMany(type => Book, book => book.user)
  books: Book[];

}