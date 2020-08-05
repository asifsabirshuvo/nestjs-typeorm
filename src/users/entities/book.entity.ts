
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Book {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookName: string;

  @Column()
  price: number;

    @ManyToOne(type => User, user => user.books)
    @JoinColumn()
    user: User

}