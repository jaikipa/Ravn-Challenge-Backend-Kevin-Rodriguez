import { SaleItem } from '../../store/entities/sale-item.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateSaleItems implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(SaleItem)().createMany(10);
  }
}
