import { createBrotliDecompress, createUnzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import { stdout } from 'node:process';

export default async function decompressFile(currentPath, fileName, outputFile) {
    try {
        const fileInputPath = path.resolve(currentPath, fileName);
        const fileOutputFile = path.resolve(currentPath, outputFile);
        const streamRead = createReadStream(fileInputPath);
        const streamDecompress = createBrotliDecompress();
        const streamWrite = createWriteStream(fileOutputFile);
        const streamZlib = createUnzip();
    
        streamRead.pipe(streamZlib).pipe(streamDecompress).pipe(streamWrite);
    } catch (e) {
        stdout.write('Invalid input\n');
    }
}
