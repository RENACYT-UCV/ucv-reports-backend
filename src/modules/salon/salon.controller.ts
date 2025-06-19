import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { Salon } from './entities/salon.entity';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get()
  async getAllSalones(): Promise<Salon[]> {
    return this.salonService.findAll();
  }

  @Get('piso/:id_piso')
  async getSalonesByPiso(
    @Param('id_piso', ParseIntPipe) id_piso: number,
  ): Promise<Salon[]> {
    return this.salonService.findByPiso(id_piso);
  }
}
