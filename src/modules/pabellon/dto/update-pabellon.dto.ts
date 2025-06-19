import { PartialType } from '@nestjs/mapped-types';
import { CreatePabellonDto } from './create-pabellon.dto';

export class UpdatePabellonDto extends PartialType(CreatePabellonDto) {}
