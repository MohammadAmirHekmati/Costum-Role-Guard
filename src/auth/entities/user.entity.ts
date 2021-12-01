import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  username:string

  @Column()
  password:string

  @OneToMany(()=>RoleEntity, p=>p.user)
  @JoinColumn()
  roles:RoleEntity[]
}