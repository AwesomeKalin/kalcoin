import { CryptoBlock } from "../CryptoBlock.js";
import { CryptoTransaction } from "../CryptoTransaction.js";

export class p2pMessage {
    constructor(public type: string, public data: CryptoBlock | CryptoTransaction) { }

    static decode(info: Buffer): p2pMessage {
        const decodedData = JSON.parse(info.toString());
        const { type, data } = decodedData;
        return new p2pMessage(type, data);
    }
}