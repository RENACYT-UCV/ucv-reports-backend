import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from './google-drive.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from '../reportes/entities/reporte.entity';
import { Express } from 'express';

@Controller('google-drive')
export class GoogleDriveController {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ) {}

  @Post('reportes/:id/upload-evidencia')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEvidencia(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileId = await this.googleDriveService.uploadFile(
      file.buffer,
      file.originalname,
    );
    const reporte = await this.reporteRepository.findOneBy({ id_reporte: id });
    if (!reporte) {
      throw new NotFoundException('Reporte no encontrado');
    }
    reporte.googleDriveFileId = fileId;
    await this.reporteRepository.save(reporte);
    return {
      message: 'Archivo cargado con éxito',
      fileId,
      fileUrl: this.googleDriveService.getFileUrl(fileId),
    };
  }
}
