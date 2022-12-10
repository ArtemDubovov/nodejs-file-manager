import path from 'path';
import { stat } from 'fs';

export default function cd(currentPath, adress) {
    console.log(currentPath, adress);
    const ph = path.resolve(currentPath, adress);
    console.log(ph);
    stat(ph, (err, stats) => {
        if (err || stats.isFile()) {
            return false;
        }
        return ph;
    });
}