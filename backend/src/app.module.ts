import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OportunidadesModule } from './oportunidades/oportunidades.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [OportunidadesModule, DashboardModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
