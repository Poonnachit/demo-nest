import { IsInt, IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  q: string;

  @IsOptional()
  skip: string;

  @IsOptional()
  limit: string;
}
