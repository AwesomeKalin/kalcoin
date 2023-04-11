import { Message, PrivateKey } from 'bitcore-lib';
//@ts-expect-error
import { kalhash } from 'kalhash.js';

export class CryptoTransaction {
    timestamp: number;
    data: any;
    hash: string = '';
    signedHash: string = '';
    from: string;
    
    constructor(timestamp: number, data: any, from: string) {
        this.timestamp = timestamp;
        this.data = data;
        this.from = from;
    }

    computeHash(privateKey: string) {
        const address = new PrivateKey(privateKey)
        this.hash = kalhash(this.from + this.timestamp + this.data);
        this.signedHash = new Message(this.hash).sign(address);
    }

    verifyHash(address: string, signature: string) {
        return new Message(this.hash).verify(address, signature);
    }
}