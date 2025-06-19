import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pabellon } from './entities/pabellon.entity';
import { PabellonService } from './pabellon.service';
import { PabellonController } from './pabellon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pabellon])],
  providers: [PabellonService],
  controllers: [PabellonController],
  exports: [PabellonService],
})
export class PabellonModule {}
