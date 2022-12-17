import path from 'path';
import { appendFile } from 'fs/promises';

export default async function add(currentPath, fileName) {
    const ph = path.resolve(currentPath, fileName);
    const result = await appendFile(ph, '', (err) => {
        if (err) stdout.write('Operation failed\n');;
    });
    return result;
}