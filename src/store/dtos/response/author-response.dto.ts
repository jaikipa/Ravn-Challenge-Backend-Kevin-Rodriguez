import { Expose } from 'class-transformer';

export class AuthorResponseDto {
  @Expose({ name: 'author_id' }) readonly id: number;
  @Expose({ name: 'author_name' }) readonly name: string;
  @Expose({ name: 'author_date_of_birth' }) readonly dateOfBirth: Date;
  @Expose({ name: 'total_sales' }) readonly totalSales: number;
}
