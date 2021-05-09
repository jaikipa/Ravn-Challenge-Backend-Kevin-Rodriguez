import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Book } from '../../store/entities/book.entity';
import { Author } from '../../store/entities/author.entity';

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.isbn = faker.random.uuid();
  book.author = factory(Author)() as any;
  return book;
});
