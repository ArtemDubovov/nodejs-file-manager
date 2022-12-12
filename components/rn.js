import path from 'path';
import { rename } from 'fs';
import { stdout } from 'process';

export default async function rn(currentPath, pathToFile, fileName) {
    try {
        const phFile = path.resolve(currentPath, pathToFile);
        const ph = path.resolve(currentPath, fileName);
        rename(phFile, ph, (err) => {
            if (err) stdout.write('Operation failed\n');
        });
    } catch (e) {
        stdout.write('Operation failed\n');
    }
}