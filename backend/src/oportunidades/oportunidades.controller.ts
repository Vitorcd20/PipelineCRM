import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OportunidadesService } from './oportunidades.service';
import { CreateOportunidadeDto } from './dto/create-oportunidade.dto';
import { UpdateOportunidadeDto } from './dto/update-oportunidade.dto';
import { FilterOportunidadeDto } from './dto/filter-oportunidade.dto';

@Controller('oportunidades')
export class OportunidadesController {
  constructor(private readonly oportunidadesService: OportunidadesService) {}

  @Get()
  findAll(@Query() filters: FilterOportunidadeDto) {
    const resultado = this.oportunidadesService.findAll(filters);
    return {
      total: resultado.length,
      dados: resultado,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oportunidadesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOportunidadeDto) {
    return this.oportunidadesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOportunidadeDto) {
    return this.oportunidadesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.oportunidadesService.remove(id);
  }
}
