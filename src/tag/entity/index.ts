import{JoinTable, Entity, PrimaryColumn, Unique} from 'typeorm'

@Entity()
@Unique('tag_name', ['name'])
export class Tag{
    @PrimaryColumn()
    name:string;

}