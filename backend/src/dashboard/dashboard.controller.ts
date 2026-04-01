import { Controller, Get } from '@nestjs/common';
import { OportunidadesService } from '../oportunidades/oportunidades.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly oportunidadesService: OportunidadesService) {}

  @Get('resumo')
  getResumo() {
    return this.oportunidadesService.getResumo();
  }
}
