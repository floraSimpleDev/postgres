import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

// init Entity
@Entity()
export class Product extends BaseEntity {
  // id column will be primary key for Product entity, automatically generate (no needing parameter)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "decimal" }) //if decimal not be defined, price will become int in psql automatically
  price!: number;

  /* @Column()
  creatorId!: number; */

  @ManyToOne(() => User, (user) => user.products)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
