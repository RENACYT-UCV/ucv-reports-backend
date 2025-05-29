import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialProductosPersonalDto } from './create-historial_productos_personal.dto';

export class UpdateHistorialProductosPersonalDto extends PartialType(CreateHistorialProductosPersonalDto) {}