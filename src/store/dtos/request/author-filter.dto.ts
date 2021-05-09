import { IsOptional, IsString } from 'class-validator';

export class AuthorFilterDto {
  /**
   * Use this field for filter authors by it name
   * @example 'Kevin Rodríguez'
   */
  @IsOptional()
  @IsString()
  readonly author_name?: string;
}
