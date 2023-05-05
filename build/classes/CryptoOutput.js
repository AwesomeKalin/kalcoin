//@ts-expect-error
import { kalhash } from 'kalhash.js';
export class CryptoOutput {
    to;
    value;
    hash;
    timestamp = Math.floor(new Date().getTime() / 1000);
    constructor(to, value) {
        this.to = to;
        this.value = value;
        this.hash = kalhash(this.timestamp + this.to + this.value);
    }
}
