import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class HosterService {
  private readonly request: any;
  private readonly logger = new Logger(HosterService.name);

  constructor(private readonly config: ConfigService,
              private readonly files: FilesService) {
    this.request = require('request-promise');
  }

  async upload(file: string): Promise<string> {
    this.logger.debug(`Requested upload of file: ${file}`);

    try {
      await this.uploadFile(file);
      return `${this.config.getCdnUrl()}${file}`;
    } catch (e) {
      this.logger.error(e.stack);
    } finally {
      this.files.removeFile(file);
    }
    throw new InternalServerErrorException('We couldn\'t proccess your file');
  }

  private async uploadFile(file: string) {
    return await this.request({
      method: 'POST',
      uri: `${this.config.getApiUrl()}${file}`,
      formData: {
        file: this.files.createReadStream(file),
      },
      headers: this.config.getApiHeaders(),
    });
  }
}
