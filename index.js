import process, { argv, env, stdin, stdout } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'node:url';

const getUserName = (arr) => {
    try {
        return arr.slice(2).filter(el => el.includes('--username'))[0].split('=')[1];
    } catch (e) {
        throw new Error('Username not set correctly, use npm run start -- --username=your_username');
    }
}

const dataHandler = (data) => {
    if (data.trim() === '.exit') {
        process.exit(0);
    }
}

const runApp = async () => {
    try {
        const PATHDIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
        const USERNAME = getUserName(argv);

        stdout.write(`Welcome to the File Manager, ${USERNAME}!\n`);
        stdin.on('data', (data) => {
            dataHandler(data);
        }).setEncoding('utf-8');

        
        process.on("exit", () => {
            stdout.write(`Thank you for using File Manager, ${USERNAME}, goodbye!\n`);
        });

        process.on('SIGINT', () => {
            process.exit(0);
        })

    } catch (e) {
        stdout.write(e.message);
    }
}

runApp();
