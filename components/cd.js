import path from 'path';
import { stat } from 'fs';

export default function cd(currentPath, adress) {
    const ph = path.resolve(currentPath, adress);
    stat(ph, (err, stats) => {
        if (err || stats.isFile()) {
            return false;
        }
        return ph;
    });
}