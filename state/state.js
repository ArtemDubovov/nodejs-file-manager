import path from 'path';

export class State {
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