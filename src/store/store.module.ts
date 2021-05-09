import { CacheModule, CACHE_MANAGER, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './controllers/author.controller';
import { SaleItemRepository } from './repositories/sale-item.repository';
import { AuthorService } from './services/author.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleItemRepository]),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
        ttl: config.get('REDIS_TTL'),
      }),
    }),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class StoreModule implements OnModuleDestroy {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Record<string, any>) {}

  async onModuleDestroy(): Promise<void> {
    const redis = this.cache.store.getClient();
    await redis.quit();
  }
}
