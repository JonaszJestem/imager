import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { ExtractorModule } from '../image-extractor/extractor.module';
import { HosterModule } from '../file-hoster/hoster.module';

@Module({
  imports: [ExtractorModule, HosterModule],
  controllers: [RestController],
  providers: [],
})
export class RestModule {
}
