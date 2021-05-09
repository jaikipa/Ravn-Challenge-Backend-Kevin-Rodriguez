import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from '../src/store/store.module';
import * as request from 'supertest';
import { getTestConnection } from './factories/test-connection.factory';
import { Author } from '../src/store/entities/author.entity';
import { Repository } from 'typeorm';
import { Book } from '../src/store/entities/book.entity';
import { SaleItemRepository } from '../src/store/repositories/sale-item.repository';

describe('Authors (e2e)', () => {
  let app: INestApplication;
  let authorRepository: Repository<Author>;
  let bookRepository: Repository<Book>;
  let saleItemRepository: SaleItemRepository;
  let author: Author;
  let book: Book;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        StoreModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          useFactory: getTestConnection,
        }),
        TypeOrmModule.forFeature([Author, Book]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
    httpServer = app.getHttpServer();
    authorRepository = app.get(getRepositoryToken(Author));
    bookRepository = app.get(getRepositoryToken(Book));
    saleItemRepository = app.get(getRepositoryToken(SaleItemRepository));
    author = await authorRepository.save({ name: 'John Doe', dateOfBirth: new Date() });
    book = await bookRepository.save({ author, isbn: '978-3-9632-1923-8' });
    await saleItemRepository.save({ book, itemPrice: 2.5, quantity: 5 });
  });

  describe('GET /authors', () => {
    it('should return 200 (Ok)', async () => {
      return request(httpServer)
        .get(`/authors?author_name=${author.name}`)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          expect(body[0].name).toEqual(author.name);
        });
    });

    it('should return 404 (Not Found)', async () => {
      await request(httpServer).get('/authors?author_name=kyle').expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
