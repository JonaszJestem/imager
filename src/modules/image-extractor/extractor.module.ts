import { Module } from '@nestjs/common';
import { ExtractorService } from './extractor.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [ExtractorService],
  exports: [ExtractorService],
})
export class ExtractorModule {
}
