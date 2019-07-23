import { Module } from '@nestjs/common';
import { HosterService } from './hoster.service';
import { ConfigModule } from '../config/config.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [ConfigModule, FilesModule],
  providers: [HosterService],
  exports: [HosterService],
})
export class HosterModule {
}
