import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hardware } from './entities/hardware.entity';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hardware])],
  controllers: [HardwareController],
  providers: [HardwareService],
  exports: [HardwareService],
})
export class HardwareModule {}