import { Controller, Post, Query } from '@nestjs/common';
import { ExtractorService } from '../image-extractor/extractor.service';
import { HosterService } from '../file-hoster/hoster.service';
import { CdnQuery } from '../../interfaces/CdnQuery';

@Controller()
export class RestController {
  constructor(private readonly imageExtractor: ExtractorService,
              private readonly fileHoster: HosterService) {
  }

  @Post()
  async getCdnLinkForMainImage(@Query() cdnQuery: CdnQuery): Promise<object> {
    const image = await this.imageExtractor.from(cdnQuery.url);
    const cdnUrl = await this.fileHoster.upload(image);

    return { cdnUrl };
  }
}
