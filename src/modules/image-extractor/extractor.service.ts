import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FilesService } from '../files/files.service';

@Injectable()
export class ExtractorService {
  private readonly og: any;
  private readonly request: any;
  private readonly logger = new Logger(ExtractorService.name);

  constructor(private readonly files: FilesService) {
    this.og = require('open-graph-scraper');
    this.request = require('request-promise');
  }

  async from(url: string): Promise<string> {
    const { content, extension } = await this.downloadMainImage(url);
    return await this.files.saveToTemporaryFile(content, extension);
  }

  private async downloadMainImage(url: string) {
    try {
      const { data: { ogImage: { url: imageUrl } } } = await this.og({ url });
      this.logger.debug(`Downloading image ${imageUrl}`);
      const content = await this.request({ uri: imageUrl });

      return {
        content,
        extension: require('path').extname(imageUrl),
      };
    } catch (e) {
      throw new NotFoundException(`Could not extract image from the ${url}`);
    }
  }
}
