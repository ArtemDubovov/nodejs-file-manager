import process, { stdout } from 'node:process';


import {
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
    mv,
    cd,
    sendCurrentPath
} from './../components/index.js';

export default async function dataHandler (data, StateApp) {
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
                        await cd(StateApp.currentPath, data, StateApp);
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
    } catch (e) {
        stdout.write('Operation failed\n');
    } finally {
        sendCurrentPath(StateApp.currentPath);
    }
}