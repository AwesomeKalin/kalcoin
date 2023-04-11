import { Message, PrivateKey } from 'bitcore-lib';
//@ts-expect-error
import { kalhash } from 'kalhash.js';
export class CryptoTransaction {
    timestamp;
    data;
    hash = '';
    signedHash = '';
    from;
    constructor(timestamp, data, from) {
        this.timestamp = timestamp;
        this.data = data;
        this.from = from;
    }
    computeHash(privateKey) {
        const address = new PrivateKey(privateKey);
        this.hash = kalhash(this.from + this.timestamp + this.data);
        this.signedHash = new Message(this.hash).sign(address);
    }
    verifyHash(address, signature) {
        return new Message(this.hash).verify(address, signature);
    }
}
