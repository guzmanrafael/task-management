import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column('boolean', { default: false })
  status!: boolean;

  @Column({ type: 'timestamptz' })
  deadline!: Date;

  @Column('text', { array: true, default: [] })
  comments!: string[];

  @Column({ default: '' })
  responsible!: string;

  @Column('text', { array: true, default: [] })
  tags?: string[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User
}
