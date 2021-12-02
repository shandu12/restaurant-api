import{ManyToOne, Entity, PrimaryGeneratedColumn,Column, } from 'typeorm'
import { Restaurant } from '../../restaurant/entity'

@Entity()
export class Menu{
    @PrimaryGeneratedColumn()
    id:number;
    @Column('varchar')
    name:string;
    @Column({type:'decimal', scale:2})
    price:number;
    @ManyToOne(() => Restaurant, {
        cascade: true,
    })
    restaurant: Restaurant;

}