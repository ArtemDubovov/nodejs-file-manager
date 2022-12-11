import path from 'path';
import { rm } from 'node:fs/promises';
import { stdout } from 'process';

export default async function remove(currentPath, fileName) {
    const ph = path.resolve(currentPath, fileName );
    await rm(ph, { recursive: true, retryDelay: 100 }, (err) => {
        stdout.write('Invalid input\n');
    });
}