//@ts-expect-error
import { kalhash } from 'kalhash.js';
import crypto from 'crypto';

export class CryptoBlock {
    index: number;
    timestamp: number;
    data: any;
    precedingHash: string;
    hash: string;
    nonce: string = '';

    constructor(index: number, timestamp: number, data: any, precedingHash: string = "") {
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

    proofOfWork(difficulty: number) {
        const target: bigint = BigInt(4184734490257787175890526282138444277401570296309356341930 / difficulty);
        while (parseInt(this.hash, 16) >= target) {
            this.nonce = this.generate256bitnumber();
            this.hash = this.computeHash();
        }
    }
}