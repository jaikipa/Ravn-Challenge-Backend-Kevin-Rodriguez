import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './controllers/author.controller';
import { SaleItemRepository } from './repositories/sale-item.repository';
import { AuthorService } from './services/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleItemRepository])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class StoreModule {}
