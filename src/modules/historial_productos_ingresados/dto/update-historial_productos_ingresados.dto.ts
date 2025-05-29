import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialProductosIngresadosDto } from './create-historial_productos_ingresados.dto';

export class UpdateHistorialProductosIngresadosDto extends PartialType(CreateHistorialProductosIngresadosDto) {}