import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { OportunidadesModule } from '../oportunidades/oportunidades.module';

@Module({
  imports: [OportunidadesModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
