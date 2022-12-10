import { readdir } from 'node:fs/promises';
import { stdout } from 'node:process';

export default async function showLs(path) {
    try {
        const list = await readdir(path, { withFileTypes: true });;
        list.map(el => {
            el.type = el.isDirectory() ? 'directory' : 'file';
        });
        console.table(list);
    } catch (e) {
        stdout.write(e);
    }
}