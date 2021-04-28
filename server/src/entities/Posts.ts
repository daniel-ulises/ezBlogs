import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt = new Date();

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column({ nullable: true, type: "int" })
  likes: number;
}
