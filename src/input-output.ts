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
}

export class Output {
    to: string;
    amount: number;

    constructor(to: string, amount: number) {
        this.to = to;
        this.amount = amount;
    }
}