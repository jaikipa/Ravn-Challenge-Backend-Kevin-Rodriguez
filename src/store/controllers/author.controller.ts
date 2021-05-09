import { Controller, Get, Query, CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthorFilterDto } from '../dtos/request/author-filter.dto';
import { AuthorResponseDto } from '../dtos/response/author-response.dto';
import { AuthorService } from '../services/author.service';

@ApiTags('Author Endpoints')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({
    summary: 'Retrieve Authors',
    description: 'Use for retrieve authors and search author by name',
  })
  @UseInterceptors(CacheInterceptor)
  @Get('')
  findAuthors(@Query() authorFilterDto: AuthorFilterDto): Promise<AuthorResponseDto[]> {
    return this.authorService.findAuthors(authorFilterDto);
  }
}
