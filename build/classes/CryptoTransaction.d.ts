import { CryptoOutput } from './CryptoOutput.js';
import { CryptoInput } from './CryptoInput.js';
export declare class CryptoTransaction {
    timestamp: number;
    data: any;
    hash: string;
    signedHash: string;
    inputs: Array<CryptoInput>;
    outputs: Array<CryptoOutput>;
    constructor(timestamp: number, privateKeyList: Array<string>, inputs: Array<CryptoOutput>, data?: any, outputs?: Array<CryptoOutput>);
    computeHash(privateKey: string): void;
    verifyHash(address: string, signature: string): any;
}
