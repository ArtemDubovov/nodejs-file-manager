import { createReadStream } from 'fs';
import path from 'path';
import { stdout } from 'process';

export default async function cat(currentPath, pathFile) {
    try {
        const pathActual = path.resolve(currentPath, pathFile);
        const stream = createReadStream(pathActual);
        stream.on('data', (chunk) => {
            stdout.write(chunk);
        });
        stream.on('end', () => {
            stdout.write('\n');
        });
        stream.on('error', () => {
            stdout.write('Operation failed\n');
        })
    } catch (e) {
        stdout.write('Operation failed\n');
    }
}
