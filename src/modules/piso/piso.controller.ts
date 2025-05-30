import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PisoService } from './piso.service';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';
import { Piso } from './entities/piso.entity';

@Controller('piso')
export class PisoController {
  constructor(private readonly pisoService: PisoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPisoDto: CreatePisoDto): Promise<Piso> {
    return this.pisoService.create(createPisoDto);
  }

  @Get()
  findAll(): Promise<Piso[]> {
    return this.pisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Piso> {
    return this.pisoService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePisoDto: UpdatePisoDto,
  ): Promise<Piso> {
    return this.pisoService.update(+id, updatePisoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.pisoService.remove(+id);
  }

  @Get('byPabellon/:idPabellon')
  findByPabellon(@Param('idPabellon') idPabellon: string): Promise<Piso[]> {
    return this.pisoService.findByPabellon(+idPabellon);
  }
}
