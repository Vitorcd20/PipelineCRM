import { IsOptional, IsIn, IsString } from 'class-validator';
import type { StatusOportunidade } from '../oportunidade.entity';

export class FilterOportunidadeDto {
  @IsOptional()
  @IsIn(['aberta', 'em_negociacao', 'fechada', 'perdida'], {
    message: 'Status inválido. Use: aberta, em_negociacao, fechada ou perdida',
  })
  status?: StatusOportunidade;

  @IsOptional()
  @IsString()
  cliente?: string;
}
