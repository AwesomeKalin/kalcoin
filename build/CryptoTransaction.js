import bitcore from 'bitcore-lib';
//@ts-expect-error
import { kalhash } from 'kalhash.js';
export class CryptoTransaction {
    timestamp;
    data;
    hash = '';
    signedHash = '';
    from;
    txFee;
    constructor(timestamp, data, from, txFee) {
        this.timestamp = timestamp;
        this.data = data;
        this.from = from;
        this.txFee = txFee;
    }
    computeHash(privateKey) {
        const address = new bitcore.PrivateKey(privateKey);
        this.hash = kalhash(this.from + this.timestamp + this.data + this.txFee);
        this.signedHash = new bitcore.Message(this.hash).sign(address);
    }
    verifyHash(address, signature) {
        const addr = new bitcore.Address(address, bitcore.Networks.add({
            name: 'kalcoin',
            pubkeyhash: 0x2D,
            privateKey: 0x1C,
            scriptHash: 0x28,
            port: 50576
        }));
        if (kalhash(this.from + this.timestamp + this.data + this.txFee) === this.hash) {
            return new bitcore.Message(this.hash).verify(addr, signature);
        }
        else
            return false;
    }
}
