import { RoleEntity } from '../../../entities/role.entity';

export class RoleQuerystring {
  data:RoleEntity[]
  limit:number
  page:number
  total:number
}