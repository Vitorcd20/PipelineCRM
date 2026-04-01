import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsIn,
  MinLength,
  MaxLength,
} from 'class-validator';
import type { StatusOportunidade } from '../oportunidade.entity';

export class CreateOportunidadeDto {
  @IsString({ message: 'Título deve ser uma string' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MinLength(3, { message: 'Título deve ter ao menos 3 caracteres' })
  @MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres' })
  titulo: string;

  @IsString({ message: 'Cliente deve ser uma string' })
  @IsNotEmpty({ message: 'Cliente é obrigatório' })
  @MinLength(2, { message: 'Cliente deve ter ao menos 2 caracteres' })
  @MaxLength(100, { message: 'Cliente deve ter no máximo 100 caracteres' })
  cliente: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  valor: number;

  @IsOptional()
  @IsIn(['aberta', 'em_negociacao', 'fechada', 'perdida'], {
    message: 'Status inválido. Use: aberta, em_negociacao, fechada ou perdida',
  })
  status?: StatusOportunidade;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  descricao?: string;
}
