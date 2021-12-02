import {Column, Entity,  ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../user/entity";
import {Restaurant} from "../../restaurant/entity";
@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id:number;
    @Column('date')
    date:Date;
    @Column('timestamp')
    time:Date;
    @ManyToOne(() => User, {
        cascade: true,
    })
    user: User;
    @ManyToOne(() => Restaurant, {
        cascade: true,
    })
    restaurant: Restaurant;
}