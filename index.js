import process, { argv, env, stdin, stdout } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'node:url';

import getUserName from './components/getUserName.js';

//Class state

class State {
    constructor(path) {
        this.currentPath = path;
    }
    pathToUp () {
        this.currentPath = path.dirname(this.currentPath);
    }
}

const dataHandler = async (data, StateApp) => {
    try {
        switch (data.trim().toLowerCase()) {
            case '.exit' : 
                process.exit(0);
                break;
            case 'up':
                stdout.write('Command up\n');
                StateApp.pathToUp();
                break;
            default : 
                stdout.write('Invalid input\n');
        }
    } catch (e) {
        stdout.write('Operation failed');
    }
}

const sendCurrentPath = (currentPath) => {
    stdout.write(`You are currently in ${currentPath}\n`);
}

const runApp = async () => {
    try {
        // CONSTS
        const USERNAME = getUserName(argv);

        // STATE

        const StateApp = new State(path.resolve(path.dirname(fileURLToPath(import.meta.url))));
        console.log(StateApp);

        // Start App
        stdout.write(`Welcome to the File Manager, ${USERNAME}!\n`);
        sendCurrentPath(StateApp.currentPath);

        // Work App
        stdin.on('data', (data) => {
            dataHandler(data, StateApp);
            sendCurrentPath(StateApp.currentPath);
        }).setEncoding('utf-8');

        
        // Exit App

        process.on("exit", () => {
            stdout.write(`Thank you for using File Manager, ${USERNAME}, goodbye!\n`);
        }).on('SIGINT', () => {
            process.exit(0);
        });
    } catch (e) {
        stdout.write(e.message);
    }
}

await runApp();
