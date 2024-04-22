import { kalhash } from "kalhash.js";
import secp256k1 from 'secp256k1';

export class Input {
    txid: string;
    index: number;
    sig: string;
    pubkey: string;

    constructor(txid: string, index: number, sig: string, pubkey: string) {
        this.txid = txid;
        this.index = index;
        this.sig = sig;
        this.pubkey = pubkey;
    }

    verifySig(outputs: Output[]): boolean {
        const toVerify: string = kalhash(JSON.stringify({ txid: this.txid, index: this.index, outputs }));
        return secp256k1.ecdsaVerify(Buffer.from(this.sig), Buffer.from(toVerify), Buffer.from(this.pubkey));
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