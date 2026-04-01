import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') ?? 'unknown';
    const inicioMs = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duracaoMs = Date.now() - inicioMs;
      const timestamp = new Date().toISOString();

      const nivel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'log';

      const mensagem = `[${timestamp}] ${method} ${originalUrl} ${statusCode} — ${duracaoMs}ms | IP: ${ip} | UA: ${userAgent}`;

      this.logger[nivel](mensagem);
    });

    next();
  }
}
