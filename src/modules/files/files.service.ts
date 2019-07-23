import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

Injectable();
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private fs: any;
  private crypto: any;

  constructor() {
    this.fs = require('fs');
    this.crypto = require('crypto');
  }

  async saveToTemporaryFile(file: Buffer, extension: string): Promise<string> {
    const temporaryName = this.getRandomName(20);
    const fileName = `${temporaryName}${extension}`;
    this.logger.debug(`Saving ${fileName}`);

    try {
      await this.fs.writeFile(fileName, file);
    } catch (e) {
      this.logger.error(`Could not write file ${fileName}`);
      throw new InternalServerErrorException('Cannot proccess your image');
    }

    this.logger.debug(`File saved as ${fileName}`);
    return fileName;
  }

  async removeFile(fileName: string) {
    try {
      await this.fs.unlink(fileName);
    } catch (e) {
      this.logger.error(`Could not remove file ${fileName}`);
      this.logger.error(e.stack);
    }
  }

  createReadStream(file: string) {
    return this.fs.createReadStream(file);
  }

  getRandomName(length: number) {
    this.logger.debug(`Getting random name of length: ${length}`);
    return this.crypto.randomBytes(length).toString('hex');
  }
}
