import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column("boolean", { default: false })
  status!: boolean;

  @Column({ type: 'timestamptz' })
  deadline!: Date;

  @Column("text", { array: true, default: [] })
  comments!: string[];

  @Column({default: ""})
  responsible!: string;

  @Column("text", { array: true, default: [] })
  tags?: string[];
}
