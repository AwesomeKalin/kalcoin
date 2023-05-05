//@ts-expect-error
import { kalhash } from 'kalhash.js';

export class CryptoOutput {
    to: string;
    value: number;
    hash: string;
    timestamp: number = Math.floor(new Date().getTime() / 1000);

    constructor(to: string, value: number) {
        this.to = to;
        this.value = value;
        this.hash = kalhash(this.timestamp + this.to + this.value);
    }
}