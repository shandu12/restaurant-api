import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Tag } from '../../tag/entity'
@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    name: string;
    @Column('text')
    picture: string;
    @Column({type:'decimal',scale:2})
    averagePrice: number;
    
    @ManyToMany(()=>Tag)
    @JoinTable()
    tags:Tag[];
}