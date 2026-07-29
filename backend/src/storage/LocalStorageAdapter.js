import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LocalStorageAdapter {
  constructor() {
    this.rawDir = path.join(__dirname, '..', '..', 'uploads', 'raw');
    this.annotatedDir = path.join(__dirname, '..', '..', 'uploads', 'annotated');

    fs.mkdirSync(this.rawDir, { recursive: true });
    fs.mkdirSync(this.annotatedDir, { recursive: true });
  }

  getRawPath(filename) {
    return path.join(this.rawDir, filename);
  }

  getAnnotatedPath(filename) {
    return path.join(this.annotatedDir, filename);
  }

  copyFile(sourcePath, targetPath) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      return true;
    } catch (err) {
      return false;
    }
  }
}
