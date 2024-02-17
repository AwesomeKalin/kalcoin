import { kalhash } from "kalhash.js";
//@ts-expect-error
import ecdsa from 'ecdsa-secp256k1';
export class Input {
    txid;
    index;
    sig;
    pubkeyx;
    pubkeyy;
    constructor(txid, index, sig, pubkeyx, pubkeyy) {
        this.txid = txid;
        this.index = index;
        this.sig = sig;
        this.pubkeyx = pubkeyx;
        this.pubkeyy = pubkeyy;
    }
    verifySig(outputs) {
        const toVerify = kalhash(JSON.stringify({ txid: this.txid, index: this.index, outputs }));
        return ecdsa.verify({ x: this.pubkeyx, y: this.pubkeyy }, this.sig, BigInt(parseInt(toVerify, 16)));
    }
}
export class Output {
    to;
    amount;
    constructor(to, amount) {
        this.to = to;
        this.amount = amount;
    }
}
