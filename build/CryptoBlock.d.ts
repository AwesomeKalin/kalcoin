export declare class CryptoBlock {
    index: number;
    timestamp: number;
    data: any;
    precedingHash: string;
    hash: string;
    nonce: number;
    constructor(index: number, timestamp: number, data: any, precedingHash?: string);
    computeHash(): any;
    proofOfWork(difficulty: number): void;
}
