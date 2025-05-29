import { PartialType } from '@nestjs/mapped-types';
import { CreateArticulosActualUsoDto } from './create-articulos_actual_uso.dto';

export class UpdateArticulosActualUsoDto extends PartialType(CreateArticulosActualUsoDto) {}