import { CryptoOutput } from "./CryptoOutput.js";
export declare class CryptoInput {
    output: CryptoOutput;
    signature: string;
    constructor(output: CryptoOutput, privateKey: string, outputsFromTX: Array<CryptoOutput>);
    verifyHash(address: string, signature: string, outputsFromTX: Array<CryptoOutput>): any;
}
