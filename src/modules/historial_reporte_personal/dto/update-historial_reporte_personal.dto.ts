import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialReportePersonalDto } from './create-historial_reporte_personal.dto';

export class UpdateHistorialReportePersonalDto extends PartialType(CreateHistorialReportePersonalDto) {}