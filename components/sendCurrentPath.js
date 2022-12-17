import { stdout } from 'node:process';

export default function sendCurrentPath (currentPath) {
    stdout.write(`You are currently in ${currentPath}\n`);
}
