import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Oportunidade, StatusOportunidade } from './oportunidade.entity';
import { CreateOportunidadeDto } from './dto/create-oportunidade.dto';
import { UpdateOportunidadeDto } from './dto/update-oportunidade.dto';
import { FilterOportunidadeDto } from './dto/filter-oportunidade.dto';

@Injectable()
export class OportunidadesService {
  private oportunidades: Oportunidade[] = [
    {
      id: randomUUID(),
      titulo: 'Desenvolvimento de Sistema ERP',
      cliente: 'Tech Solutions Ltda',
      valor: 85000,
      status: 'em_negociacao',
      descricao: 'Sistema completo de gestão empresarial',
      criadoEm: new Date('2025-01-10'),
      atualizadoEm: new Date('2025-01-15'),
    },
    {
      id: randomUUID(),
      titulo: 'Consultoria em Cloud',
      cliente: 'Inova Corp',
      valor: 32000,
      status: 'aberta',
      descricao: 'Migração para AWS e treinamento de equipe',
      criadoEm: new Date('2025-01-20'),
      atualizadoEm: new Date('2025-01-20'),
    },
    {
      id: randomUUID(),
      titulo: 'App Mobile E-commerce',
      cliente: 'Varejo Digital SA',
      valor: 120000,
      status: 'fechada',
      descricao: 'Aplicativo iOS e Android para e-commerce',
      criadoEm: new Date('2024-12-01'),
      atualizadoEm: new Date('2025-01-05'),
    },
    {
      id: randomUUID(),
      titulo: 'Redesign Portal Corporativo',
      cliente: 'Grupo Empresarial XYZ',
      valor: 18500,
      status: 'perdida',
      descricao: 'Modernização do portal intranet',
      criadoEm: new Date('2024-11-15'),
      atualizadoEm: new Date('2024-12-10'),
    },
  ];

  findAll(filters: FilterOportunidadeDto): Oportunidade[] {
    let resultado = [...this.oportunidades];

    if (filters.status) {
      resultado = resultado.filter((op) => op.status === filters.status);
    }

    if (filters.cliente) {
      const clienteLower = filters.cliente.toLowerCase();
      resultado = resultado.filter((op) =>
        op.cliente.toLowerCase().includes(clienteLower),
      );
    }

    return resultado;
  }

  findOne(id: string): Oportunidade {
    const oportunidade = this.oportunidades.find((op) => op.id === id);

    if (!oportunidade) {
      throw new NotFoundException(`Oportunidade com ID "${id}" não encontrada`);
    }

    return oportunidade;
  }

  create(dto: CreateOportunidadeDto): Oportunidade {
    const novaOportunidade: Oportunidade = {
      id: randomUUID(),
      titulo: dto.titulo,
      cliente: dto.cliente,
      valor: dto.valor,
      status: dto.status ?? 'aberta',
      descricao: dto.descricao,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.oportunidades.push(novaOportunidade);
    return novaOportunidade;
  }

  update(id: string, dto: UpdateOportunidadeDto): Oportunidade {
    const index = this.oportunidades.findIndex((op) => op.id === id);

    if (index === -1) {
      throw new NotFoundException(`Oportunidade com ID "${id}" não encontrada`);
    }

    const atualizada: Oportunidade = {
      ...this.oportunidades[index],
      ...dto,
      atualizadoEm: new Date(),
    };

    this.oportunidades[index] = atualizada;
    return atualizada;
  }

  remove(id: string): void {
    const index = this.oportunidades.findIndex((op) => op.id === id);

    if (index === -1) {
      throw new NotFoundException(`Oportunidade com ID "${id}" não encontrada`);
    }

    this.oportunidades.splice(index, 1);
  }

  getResumo() {
    const totaisPorStatus: Record<StatusOportunidade, number> = {
      aberta: 0,
      em_negociacao: 0,
      fechada: 0,
      perdida: 0,
    };

    const valorPorStatus: Record<StatusOportunidade, number> = {
      aberta: 0,
      em_negociacao: 0,
      fechada: 0,
      perdida: 0,
    };

    let valorTotal = 0;

    for (const op of this.oportunidades) {
      totaisPorStatus[op.status]++;
      valorPorStatus[op.status] += op.valor;
      valorTotal += op.valor;
    }

    return {
      totalOportunidades: this.oportunidades.length,
      valorTotal,
      porStatus: Object.entries(totaisPorStatus).map(([status, total]) => ({
        status,
        total,
        valorAgregado: valorPorStatus[status as StatusOportunidade],
      })),
    };
  }
}
