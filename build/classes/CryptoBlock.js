//@ts-expect-error
import { kalhash } from 'kalhash.js';
import crypto from 'crypto';
export class CryptoBlock {
    index;
    timestamp;
    data;
    precedingHash;
    hash;
    nonce = '';
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
    generate256bitnumber() {
        return crypto.randomBytes(32).toString();
    }
    proofOfWork(difficulty) {
        const target = BigInt(4184734490257787175890526282138444277401570296309356341930 / difficulty);
        while (parseInt(this.hash, 16) >= target) {
            this.nonce = this.generate256bitnumber();
            this.hash = this.computeHash();
        }
    }
}
