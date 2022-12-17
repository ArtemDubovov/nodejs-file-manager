import path from 'path';
import { createReadStream, createWriteStream, rm } from 'fs';
import { stdout } from 'process';
import remove from './rm.js';

export default async function mv(currentPath, arg1, arg2) {
    try {
        if (!arg1 || !arg2) return;

        const copyFilePath = path.resolve(currentPath, arg1);
        const pasteFilePath = path.resolve(currentPath, arg2);

        const streamRead = createReadStream(copyFilePath);

        streamRead.on('error', () => {
            stdout.write('Operation failed\n');
            return;
        });

        const streamWrite = createWriteStream(pasteFilePath);

        streamWrite.on('error', () => {
            stdout.write('Operation failed\n');
            return;
        });

        streamRead.pipe(streamWrite);

    } catch (e) {
        stdout.write('Operation failed\n');
    } finally {
        remove(currentPath, arg1);
    }
}