import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SaleItem } from '../entities/sale-item.entity';

@EntityRepository(SaleItem)
export class SaleItemRepository extends Repository<SaleItem> {
  getTopAuthors(authorName: string): Promise<SaleItem[]> {
    Logger.debug(`Finding no cached Authors in DB: ${authorName}`, SaleItemRepository.name);

    const query = this.createQueryBuilder('saleItem')
      .select('SUM(saleItem.item_price * saleItem.quantity)', 'total_sales')
      .addSelect('author')
      .leftJoin('saleItem.book', 'book')
      .leftJoin('book.author', 'author')
      .groupBy('author.id')
      .orderBy('total_sales', 'DESC')
      .limit(10);

    if (authorName) {
      query.andWhere('name ilike :name', { name: `%${authorName}%` });
    }

    return query.getRawMany();
  }
}
