# PipelineCRM — Backend API

NestJS REST API for managing sales opportunities.

## Stack

- **NestJS** — framework
- **class-validator + class-transformer** — DTO validation
- **In-memory array** — data store (seed data included)

## Running

```bash
npm install
npm run start:dev   # http://localhost:3000
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/oportunidades` | List all (filters: `?status=aberta&cliente=Tech`) |
| GET | `/api/oportunidades/:id` | Get by ID |
| POST | `/api/oportunidades` | Create |
| PATCH | `/api/oportunidades/:id` | Update status / value / description |
| DELETE | `/api/oportunidades/:id` | Remove |
| GET | `/api/dashboard/resumo` | Totals per status + aggregate value |

## Create payload

```json
{
  "titulo": "New CRM System",
  "cliente": "Acme Corp",
  "valor": 45000,
  "status": "aberta",
  "descricao": "Optional description"
}
```

**Valid statuses:** `aberta` · `em_negociacao` · `fechada` · `perdida`

## Error format

```json
{
  "statusCode": 400,
  "erro": "Bad Request",
  "mensagem": ["Title is required"],
  "caminho": "/api/oportunidades",
  "timestamp": "2025-01-31T12:00:00.000Z"
}
```

## Architecture decisions

- **Middleware logger** — logs every request with method, route, status, duration, IP
- **Global exception filter** — normalises all errors (HTTP + unexpected) into a consistent shape
- **ValidationPipe** with `whitelist: true` — strips unknown fields, prevents injection of extra data
- **Service layer** — controller stays thin; all business logic lives in `OportunidadesService`

## What I'd improve with more time

- Replace in-memory array with **TypeORM + PostgreSQL** / SQLite
- Add **pagination** (`?page=1&limit=20`) to the list route
- **JWT auth** — protect write endpoints
- **Swagger/OpenAPI** docs via `@nestjs/swagger`
- Unit + e2e tests with Jest + Supertest
