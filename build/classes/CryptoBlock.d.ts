export declare class CryptoBlock {
    index: number;
    timestamp: number;
    data: any;
    precedingHash: string;
    hash: string;
    nonce: string;
    constructor(index: number, timestamp: number, data: any, precedingHash?: string);
    computeHash(): any;
    generate256bitnumber(): string;
    proofOfWork(difficulty: number): void;
}
