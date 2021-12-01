import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
export class RouteEntity {

  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  address:string

  @Column()
  method:string

  @Column({nullable:true})
  body:string

  @Column({nullable:true})
  param:string

  @Column({default:false})
  deleted:boolean

  @ManyToMany(()=>RoleEntity)
  @JoinTable()
  roles:RoleEntity[]
}
