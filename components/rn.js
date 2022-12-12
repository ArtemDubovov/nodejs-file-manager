import path from 'path';
import { rename } from 'fs/promises';

export default async function rn(currentPath, pathToFile, fileName) {
    const phFile = path.resolve(currentPath, pathToFile);
    const ph = path.resolve(currentPath, fileName);
    await rename(phFile, ph, (err) => {
        if (err) stdout.write('Operation failed\n');
    });
}