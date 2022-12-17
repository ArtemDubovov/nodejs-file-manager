import os from 'node:os';
import { stdout } from 'node:process';

export default async function system(request) {
    switch (request) {
        case '--EOL':
            stdout.write(JSON.stringify(os.EOL).concat('\n'));
            break;
        case '--cpus':
            const data = os.cpus();
            stdout.write(`amount of CPUS: ${data.length}, ${data.map(el => el.model).join(':')}\n`)
            break;
        case '--homedir':
            stdout.write(os.homedir().concat('\n'));
            break;
        case '--username':
            stdout.write(os.hostname().concat('\n'));
            break;
        case '--architecture':
            stdout.write(os.arch().concat('\n'));
            break;
        default:
            stdout.write('Invalid input\n');
    }
}