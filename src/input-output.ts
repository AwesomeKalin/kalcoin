import { kalhash } from "kalhash.js";
//@ts-expect-error
import ecdsa from 'ecdsa-secp256k1';

export class Input {
    txid: string;
    index: number;
    sig: string;
    pubkeyx: string;
    pubkeyy: string;

    constructor(txid: string, index: number, sig: string, pubkeyx: string, pubkeyy: string) {
        this.txid = txid;
        this.index = index;
        this.sig = sig;
        this.pubkeyx = pubkeyx;
        this.pubkeyy = pubkeyy;
    }

    verifySig(outputs: Output[]) {
        const toVerify: string = kalhash(JSON.stringify({ txid: this.txid, index: this.index, outputs }));
        return ecdsa.verify({ x: this.pubkeyx, y: this.pubkeyy }, this.sig, BigInt(parseInt(toVerify, 16)));
    }
}

export class Output {
    to: string;
    amount: number;

    constructor(to: string, amount: number) {
        this.to = to;
        this.amount = amount;
    }
}