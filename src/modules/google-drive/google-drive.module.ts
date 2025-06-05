import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { GoogleDriveController } from './google-drive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from '../reportes/entities/reporte.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte]), ConfigModule],
  providers: [GoogleDriveService],
  controllers: [GoogleDriveController],
})
export class GoogleDriveModule {}
