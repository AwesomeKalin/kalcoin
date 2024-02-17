export declare class Input {
    txid: string;
    index: number;
    sig: string;
    pubkeyx: string;
    pubkeyy: string;
    constructor(txid: string, index: number, sig: string, pubkeyx: string, pubkeyy: string);
    verifySig(outputs: Output[]): any;
}
export declare class Output {
    to: string;
    amount: number;
    constructor(to: string, amount: number);
}
