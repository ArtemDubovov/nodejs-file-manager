import path from 'path';
import { rename } from 'fs/promises';

export default async function rn(currentPath, pathToFile, fileName) {
    const ph = path.resolve(currentPath, fileName);
    await rename(pathToFile, ph, (err) => {
        if (err) stdout.write('Invalid input\n');;
    });
}