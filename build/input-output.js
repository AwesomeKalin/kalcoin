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
}
export class Output {
    to;
    amount;
    constructor(to, amount) {
        this.to = to;
        this.amount = amount;
    }
}
