import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity('sale_items')
@Check(`"item_price" >= 0`)
@Check(`"quantity" > 0`)
export class SaleItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Book, (book) => book.saleItems)
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @Column('decimal', { name: 'item_price', nullable: false })
  itemPrice!: number;

  @Column('int4', { nullable: false })
  quantity!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
