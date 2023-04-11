import bitcore from 'bitcore-lib';
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
        const address = new bitcore.PrivateKey(privateKey)
        this.hash = kalhash(this.from + this.timestamp + this.data);
        this.signedHash = new bitcore.Message(this.hash).sign(address);
    }

    verifyHash(address: string, signature: string) {
        const addr: any = new bitcore.Address(address, bitcore.Networks.add({
            name: 'kalcoin',
            pubkeyhash: 0x2D,
            privateKey: 0x1C,
            scriptHash: 0x28,
            port: 50576
        }));
        if (kalhash(this.from + this.timestamp + this.data) === this.hash) {
            return new bitcore.Message(this.hash).verify(addr, signature);
        } else return false;
    }
}