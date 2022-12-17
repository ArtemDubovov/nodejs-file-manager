import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { stdout } from 'process';

export default async function cp(currentPath, arg1, arg2) {
    try {
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
    }
}