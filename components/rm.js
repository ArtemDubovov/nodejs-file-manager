import path from 'path';
import { rm } from 'node:fs/promises';
import { stdout } from 'process';

export default async function remove(currentPath, fileName) {
    try {
        const ph = path.resolve(currentPath, fileName );
        await rm(ph, { recursive: true, retryDelay: 100 }, (err) => {
            stdout.write('Operation failed\n');
        });
    } catch (e) {
        stdout.write('Operation failed\n');
    }
}
