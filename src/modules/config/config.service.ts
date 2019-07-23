import { Injectable } from '@nestjs/common';

Injectable();

export class ConfigService {
  getApiUrl(): string {
    return `http://file-api.fra02.sl.labs/${this.getService()}/${this.getNamespace()}/`;
  }

  getCdnUrl(): string {
    return `https://cdn-labs.livechat-static.com/api/file/${this.getService()}/${this.getNamespace()}/`;
  }

  getApiHeaders(): object {
    return {
      Authorization: `Bearer ${this.getApiToken()}`,
    };
  }

  getService(): string {
    return 'lc';
  }

  getNamespace(): string {
    return 'img';
  }

  private getApiToken() {
    return 'fra-a:UbRq2IWgRD-u05UUfr2pfg';
  }
}
