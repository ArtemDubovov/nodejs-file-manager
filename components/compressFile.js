import { createBrotliCompress, createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import { stdout } from 'node:process';

export default async function compressFile(currentPath, fileName, outputFile) {
    try {
        const fileInputPath = path.resolve(currentPath, fileName);
        const fileOutputFile = path.resolve(currentPath, outputFile);
        const streamRead = createReadStream(fileInputPath);
        const streamCompress = createBrotliCompress();
        const streamWrite = createWriteStream(fileOutputFile);
        const streamZlib = createGzip();

        streamRead.on('error', () => stdout.write('Operation failed\n'));
    
        streamRead.pipe(streamCompress).pipe(streamZlib).pipe(streamWrite);
    } catch (e) {
        stdout.write('Operation failed\n');
    }
}
