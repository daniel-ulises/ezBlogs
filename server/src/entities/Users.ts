import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt = new Date();

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @Column({ type: "varchar", length: 250, unique: true })
  username: string;

  @Column()
  @MinLength(10, { message: "Password too short" })
  password: string;
}
