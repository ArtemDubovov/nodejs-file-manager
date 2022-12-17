import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { stdout } from 'node:process';

export default async function getHash(currentPath, pathFile) {
    try {
        const actualFilePath = path.resolve(currentPath, pathFile);
        const stream = createReadStream(actualFilePath);

        stream.on('error', () => stdout.write('Operation failed\n'));

        stream.setEncoding('utf-8');
        const hash = createHash('sha256');
        stream.on('readable', () => {
            const data = stream.read();
            if (data) {
                hash.update(data);
            } else {
                stdout.write(hash.digest('hex').concat('\n'));
            }
        });
    } catch (e) {
        stdout.write('Operation failed\n');
    }
}