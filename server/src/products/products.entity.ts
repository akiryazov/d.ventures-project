import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum Category {
  TECHNOLOGY,
  GROCERIES,
  HEALTHCARE,
  CLOTHING,
  ANIMAL,
  OTHER

}

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  category: Category;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: 'timestamp',
    default: () => '(DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d 00:00:00"))',
    nullable: false,
  })
  createDate: Date;
}