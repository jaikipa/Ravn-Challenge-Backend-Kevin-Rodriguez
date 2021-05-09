import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Book } from '../../store/entities/book.entity';
import { SaleItem } from '../../store/entities/sale-item.entity';

define(SaleItem, (faker: typeof Faker) => {
  const saleItem = new SaleItem();
  saleItem.itemPrice = +faker.commerce.price(0, 1000, 2);
  saleItem.quantity = faker.random.number({ min: 1, max: 15 });
  saleItem.book = factory(Book)() as any;
  return saleItem;
});
