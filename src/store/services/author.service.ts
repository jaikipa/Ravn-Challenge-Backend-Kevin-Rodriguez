import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthorFilterDto } from '../dtos/request/author-filter.dto';
import { AuthorResponseDto } from '../dtos/response/author-response.dto';
import { SaleItemRepository } from '../repositories/sale-item.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly saleItemRepository: SaleItemRepository) {}

  async findAuthors({ author_name: authorName }: AuthorFilterDto): Promise<AuthorResponseDto[]> {
    const authors = await this.saleItemRepository.getTopAuthors(authorName);
    if (!authors.length) {
      throw new NotFoundException(`No authors found with name ${authorName}`);
    }
    return plainToClass(AuthorResponseDto, authors, { excludeExtraneousValues: true });
  }
}
