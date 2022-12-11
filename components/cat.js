import path from 'path';
import { createReadStream } from 'fs';
import { stdout } from 'process';

export default async function cat(pathFile) {
    const stream = createReadStream(pathFile);
    stream.on('data', (chunk) => {
        stdout.write(chunk);
    })
    stream.on('end', () => {
        stdout.write('\n');
    })
}
