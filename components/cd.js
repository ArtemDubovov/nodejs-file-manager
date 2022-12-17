import path from 'path';
import { stat } from 'node:fs/promises';
import { stdout } from 'process';

export default async function cd(currentPath, adress, StateApp) {
    try {
        const pathName = adress.split(' ').slice(1).join(' ').trim();
        const ph = path.resolve(currentPath, pathName);
        const statFile = await stat(ph);
        if (!statFile.isDirectory()) {
            stdout.write('Operation failed\n')
        } else {
            StateApp.currentPath = ph;
        }
    } catch (e) {
        console.log(e);
        stdout.write('Operation failed\n');
    }
}