import process, { stdout } from 'node:process';

export default function getUserName (arr) {
    try {
        return arr.slice(2).filter(el => el.includes('--username'))[0].split('=')[1];
    } catch (e) {
        stdout.write('Username not set correctly, use npm run start -- --username=your_username\n');
        process.exit(0);
    }
}
