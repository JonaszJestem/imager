import { Module } from '@nestjs/common';
import { RestModule } from './modules/rest/rest.module';

@Module({
  imports: [RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
