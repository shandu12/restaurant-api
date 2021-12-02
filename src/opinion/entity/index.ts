import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../user/entity";
import {Restaurant} from "../../restaurant/entity";
@Entity()
export class Opinion{
    @PrimaryGeneratedColumn()
    id:number;
    @Column('text')
    comment:string;
    @Column('integer')
    rating:number;
    @ManyToOne(() => User , {
        cascade: true,
    })
    user: User;
    @ManyToOne(() => Restaurant, {
        cascade: true,
    })
    restaurant: Restaurant;
}