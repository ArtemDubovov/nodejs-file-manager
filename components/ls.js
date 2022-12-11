import { readdir } from 'node:fs/promises';

export default async function showLs(path) {
    let list = await readdir(path, { withFileTypes: true });;
    list.map(el => {
        el.type = el.isDirectory() ? 'directory' : 'file';
    });
    const directoryList = list.filter(el => el.type === 'directory').sort((a, b) => a.name - b.name);
    const fileList = list.filter(el => el.type === 'file').sort((a, b) => a.name - b.name);
    console.table([...directoryList, ...fileList]);
}