export declare class CryptoTransaction {
    timestamp: number;
    data: any;
    hash: string;
    signedHash: string;
    from: string;
    txFee: number;
    constructor(timestamp: number, data: any, from: string, txFee: number);
    computeHash(privateKey: string): void;
    verifyHash(address: string, signature: string): any;
}
