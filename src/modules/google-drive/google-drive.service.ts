import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as stream from 'stream';

@Injectable()
export class GoogleDriveService {
  private drive;

  constructor(private configService: ConfigService) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email:
          this.configService.get<string>('GOOGLE_CLIENT_EMAIL') || '',
        private_key: (
          this.configService.get<string>('GOOGLE_PRIVATE_KEY') || ''
        ).replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const res = await this.drive.files.create({
      requestBody: { name: fileName },
      media: {
        mimeType: 'application/octet-stream',
        body: bufferStream,
      },
    });
    const fileId = res.data.id;
    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    return fileId;
  }

  getFileUrl(fileId: string): string {
    return `https://drive.google.com/uc?id=${fileId}`;
  }
}
