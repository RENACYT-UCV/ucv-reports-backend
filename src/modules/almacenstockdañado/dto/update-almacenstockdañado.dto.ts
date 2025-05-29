import { PartialType } from '@nestjs/mapped-types';
import { CreateAlmacenStockDanadoDto } from './create-almacenstockdañado.dto';

export class UpdateAlmacenStockDanadoDto extends PartialType(CreateAlmacenStockDanadoDto) {}