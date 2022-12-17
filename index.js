import process, { argv, stdin, stdout } from 'node:process';
import { homedir } from 'node:os';

import dataHandler from './handlers/mainHandler.js';
import { getUserName, sendCurrentPath } from './components/index.js';
import { State } from './state/state.js';

// START APP------------------------------------------------------------------------------------

const runApp = async () => {
    try {
        // CONSTS
        const USERNAME = getUserName(argv);
        const PATH_DEFAULT = homedir();

        // STATE
        const StateApp = new State(PATH_DEFAULT);

        // Start App
        stdout.write(`Welcome to the File Manager, ${USERNAME}!\n`);
        sendCurrentPath(StateApp.currentPath);
        stdin.setEncoding('utf-8');

        // Work App
        stdin.on('data', async (data) => {
            await dataHandler(data, StateApp);
        });
        
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
