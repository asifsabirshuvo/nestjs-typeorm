
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  
  @PrimaryGeneratedColumn()
  id: Number;
    
  @Column()
  house: string;

  @Column()
  road: string;

  @Column()
  city: string;


    @OneToOne(type => User, user => user.address)
    @JoinColumn()
    user: User

}