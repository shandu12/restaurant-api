import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique('user_username', ['username'])
export class User {
   @PrimaryGeneratedColumn()
   id: number;
   @Column('varchar')
   username: string;
   @Column('varchar')
   password: string;
}