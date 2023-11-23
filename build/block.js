//@ts-ignore
import kalhash from 'kalhash.js';
export class Block {
    index;
    hash;
    previousHash;
    timestamp;
    data;
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.hash = this.calculateHash(index, previousHash, timestamp, data);
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
    calculateHash(index, previousHash, timestamp, data) {
        //@ts-ignore
        return kalhash(index + previousHash + timestamp + data);
    }
}
