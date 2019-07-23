import { IsUrl } from 'class-validator';

export class CdnQuery {
  @IsUrl()
  url: string;
}
