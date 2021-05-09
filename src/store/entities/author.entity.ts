import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];

  @Column({ nullable: false })
  name!: string;

  @Column({ name: 'date_of_birth', nullable: false })
  dateOfBirth!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
