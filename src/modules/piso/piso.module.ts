import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';
import { PisoService } from './piso.service';
import { PisoController } from './piso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Piso])],
  providers: [PisoService],
  controllers: [PisoController],
  exports: [PisoService],
})
export class PisoModule {}
