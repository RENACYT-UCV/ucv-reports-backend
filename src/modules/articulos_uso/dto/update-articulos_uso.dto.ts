import { PartialType } from '@nestjs/mapped-types';
import { CreateArticulosUsoDto } from './create-articulos_uso.dto';

export class UpdateArticulosUsoDto extends PartialType(CreateArticulosUsoDto) {}