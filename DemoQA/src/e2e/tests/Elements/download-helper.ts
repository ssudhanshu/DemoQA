import { browser } from 'protractor';

const fs = require('fs');
const path = require('path');

export class ProtractorDownloadHelper {
  private readonly maxReadWaitTime = 10000; // 10 seconds

  constructor() {
  }

  removeFile(fileName: string): void {
    this.removeFileAtPath(this.getFilePath(fileName));
  }

  async getFileContents(fileName: string): Promise<string> {
    const filePath: string = this.getFilePath(fileName);
    try {
      await browser.driver.wait(() => {
        // Wait until the file exists, download may take some time
        return fs.existsSync(filePath);
      }, this.maxReadWaitTime);
    } catch (err) {
      throw new Error(`File ${filePath} does not exist`);
    }

    return fs.readFileSync(filePath, { encoding: 'utf8' });
  }

  private removeFileAtPath(filePath: string): void {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  private getFilePath(fileName: string): string {
    return path.join(__dirname, fileName);
  }
}