//@ts-expect-error
import { kalhash } from 'kalhash.js';

export class CryptoBlock {
    index: number;
    timestamp: number;
    data: any;
    precedingHash: string;
    hash: string;
    nonce: number = 0;

    constructor(index: number, timestamp: number, data: any, precedingHash: string ="") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash()
    }

    computeHash() {
        return kalhash(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    proofOfWork(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}