import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialReportesDto } from './create-historial_reportes.dto';

export class UpdateHistorialReportesDto extends PartialType(CreateHistorialReportesDto) {}