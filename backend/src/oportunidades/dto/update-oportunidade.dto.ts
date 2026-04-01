import { IsNumber, IsOptional, IsPositive, IsIn, IsString, MaxLength } from 'class-validator';
import type { StatusOportunidade } from '../oportunidade.entity';

export class UpdateOportunidadeDto {
  @IsOptional()
  @IsIn(['aberta', 'em_negociacao', 'fechada', 'perdida'], {
    message: 'Status inválido. Use: aberta, em_negociacao, fechada ou perdida',
  })
  status?: StatusOportunidade;

  @IsOptional()
  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  valor?: number;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  descricao?: string;
}
