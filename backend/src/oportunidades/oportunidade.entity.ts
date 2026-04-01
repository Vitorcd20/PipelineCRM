export type StatusOportunidade = 'aberta' | 'em_negociacao' | 'fechada' | 'perdida';

export interface Oportunidade {
  id: string;
  titulo: string;
  cliente: string;
  valor: number;
  status: StatusOportunidade;
  descricao?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
