import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorService } from './author.service';
import { SaleItemRepository } from '../repositories/sale-item.repository';
import { authorsMock } from '../mocks/author.mock';
import { NotFoundException } from '@nestjs/common';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let module: TestingModule;
  let saleItemRepository: SaleItemRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(SaleItemRepository),
          useValue: { getTopAuthors: jest.fn() },
        },
      ],
    }).compile();

    authorService = module.get(AuthorService);
    saleItemRepository = module.get(getRepositoryToken(SaleItemRepository));
  });

  it('should be defined', async () => {
    expect(authorService).toBeDefined();
    expect(saleItemRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an author with the given name', async () => {
      const name = authorsMock[0].author_name;
      (saleItemRepository.getTopAuthors as jest.Mock).mockResolvedValue(authorsMock);
      const authors = await authorService.findAuthors({ author_name: name });

      expect(Array.isArray(authors)).toBeTruthy();
      expect(authors[0]).toBeDefined();
      expect(authors[0].totalSales).toBe(authorsMock[0].total_sales);
    });

    it('should throw a not found exception', async () => {
      const name = 'Invalid name';
      (saleItemRepository.getTopAuthors as jest.Mock).mockResolvedValue([]);
      expect(authorService.findAuthors({ author_name: name })).rejects.toThrowError(NotFoundException);
    });
  });
});
