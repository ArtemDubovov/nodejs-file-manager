import path from 'path';
import { rm } from 'node:fs/promises';

export default async function remove(currentPath, fileName) {
    const ph = path.resolve(currentPath, fileName );
    rm(ph, { recursive: true, retryDelay: 100 }, (err) => {
        
    });
}