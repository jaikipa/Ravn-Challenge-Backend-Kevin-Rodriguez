import { Author } from '../../store/entities/author.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Author, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const author = new Author();
  author.name = `${firstName} ${lastName}`;
  author.dateOfBirth = faker.date.past();
  return author;
});
