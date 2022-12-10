import process, { argv, env, stdin, stdout } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { stat } from 'node:fs';

import getUserName from './components/getUserName.js';
import showLs from './components/ls.js';
import cd from './components/cd.js';

//Functions

//Class state

class State {
    constructor(path) {
        this.currentPath = path;
    }

    get currentPath() {
        return this._currentPath;
    }

    set currentPath(value) {
        this._currentPath = value;
    }

    pathToUp () {
        this._currentPath = path.dirname(this._currentPath);
    }
}

const dataHandler = async (data, StateApp) => {
    try {
        const [command, request1, request2 ] = [...data.split(' ')];
        switch (data.trim()) {

            case '.exit' : 
                process.exit(0);
            case 'up':
                stdout.write('Command up\n');
                StateApp.pathToUp();
                break;
            case 'ls': {
                await showLs(StateApp.currentPath);
                break;
            }
            default:
                switch (command.trim()) {
                    case 'cd': {
                        const ph = path.resolve(StateApp.currentPath, request1.trim());
                        stat(ph, (err, stats) => {
                            if (err || stats.isFile()) {
                                stdout.write('Invalid input\n');
                                return;
                            }
                            StateApp.currentPath = ph;
                        });
                        break;
                    }
                    default: 
                        stdout.write('Invalid input\n');
                }
        }
    } catch (e) {
        stdout.write(e.message);
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
