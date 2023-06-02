/// <reference types="node" />
import { CryptoBlock } from "../CryptoBlock.js";
import { CryptoTransaction } from "../CryptoTransaction.js";
export declare class p2pMessage {
    type: string;
    data: CryptoBlock | CryptoTransaction;
    constructor(type: string, data: CryptoBlock | CryptoTransaction);
    static decode(info: Buffer): p2pMessage;
}
