import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'creches' })
export class Creche extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.creches)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
