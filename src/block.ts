//@ts-ignore
import kalhash from 'kalhash.js';

export class Block {
    public index: number;
    public hash: string;
    public previousHash: string | null;
    public timestamp: number;
    public data: string;

    constructor(index: number, previousHash: string | null, timestamp: number, data: string) {
        this.index = index;
        this.hash = this.calculateHash(index, previousHash, timestamp, data);
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }

    calculateHash(index: number, previousHash: string | null, timestamp: number, data: string): string {
        //@ts-ignore
        return kalhash(index + previousHash + timestamp + data);
    }
}