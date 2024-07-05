import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
