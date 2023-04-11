//@ts-expect-error
import { kalhash } from 'kalhash.js';
export class CryptoBlock {
    index;
    timestamp;
    data;
    precedingHash;
    hash;
    nonce = 0;
    constructor(index, timestamp, data, precedingHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        return kalhash(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }
    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}
