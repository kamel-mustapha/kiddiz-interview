import { BaseEntity } from 'src/common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Creche } from '../creche/creche.entity';

@Entity({ name: 'kids' })
export class Kid extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.kids)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Creche)
  @JoinTable()
  creches: Creche[];
}
