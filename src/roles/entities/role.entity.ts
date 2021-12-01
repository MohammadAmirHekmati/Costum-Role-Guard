import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RouteEntity } from './route.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity()
export class RoleEntity {

  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  name:string

  @Column()
  description:string

  @Column({default:true})
  enabled:boolean

  @JoinTable()
  routes:RouteEntity[]

  @ManyToOne(()=>UserEntity, x=>x.roles)
  @JoinColumn()
  user:UserEntity
}