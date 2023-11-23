export declare class Block {
    index: number;
    hash: string;
    previousHash: string | null;
    timestamp: number;
    data: string;
    constructor(index: number, previousHash: string | null, timestamp: number, data: string);
    calculateHash(index: number, previousHash: string | null, timestamp: number, data: string): string;
}
