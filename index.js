import process, { argv, env, stdin, stdout } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { stat } from 'node:fs';

import {
    getUserName,
    showLs,
    add,
    rn,
    remove,
    cat,
    system,
    getHash,
    compressFile,
    decompressFile,
    cp,
    mv} from './components/index.js';

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
        const [command, request1, request2 ] = [...data.split(' ').map(el => el.trim())];
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
                switch (command) {
                    case 'cd': {
                        const ph = path.resolve(StateApp.currentPath, request1);
                        stat(ph, (err, stats) => {
                            if (err || stats.isFile()) {
                                stdout.write('Operation failed\n');
                                return;
                            }
                            StateApp.currentPath = ph;
                            sendCurrentPath(StateApp.currentPath);
                            return false;
                        });
                        break;
                    }
                    case 'add':
                        await add(StateApp.currentPath, request1);
                        break;
                    case 'rn':
                        await rn(StateApp.currentPath, request1, request2);
                        break;
                    case 'cp':
                        await cp(StateApp.currentPath, request1, request2);
                        break;
                    case 'rm':
                        await remove(StateApp.currentPath, request1);
                        break;
                    case 'mv':
                        await mv(StateApp.currentPath, request1, request2)
                        break;
                    case 'cat':
                        await cat(StateApp.currentPath, request1);
                        break;
                    case 'os':
                        await system(request1);
                        break;
                    case 'hash':
                        await getHash(StateApp.currentPath, request1);
                        break;
                    case 'compress':
                        await compressFile(StateApp.currentPath, request1, request2);
                        break;
                    case 'decompress':
                        await decompressFile(StateApp.currentPath, request1, request2);
                        break;
                    default: 
                        stdout.write('Invalid input\n');
                }
        }
        return true;
    } catch (e) {
        stdout.write('Invalid input\n');
    }
}

const sendCurrentPath = (currentPath) => {
    stdout.write(`You are currently in ${currentPath}\n`);
}

// START APP------------------------------------------------------------------------------------

const runApp = async () => {
    try {
        // CONSTS
        const USERNAME = getUserName(argv);
        const PATH_DEFAULT = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

        // STATE

        const StateApp = new State(PATH_DEFAULT);

        // Start App
        stdout.write(`Welcome to the File Manager, ${USERNAME}!\n`);
        sendCurrentPath(StateApp.currentPath);

        // Work App
        stdin.on('data', async (data) => {
            await dataHandler(data, StateApp)
            .then((res) => {
                if (res) {
                    sendCurrentPath(StateApp.currentPath);
                }
            });
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
