export declare class CryptoTransaction {
    timestamp: number;
    data: any;
    hash: string;
    signedHash: string;
    from: string;
    constructor(timestamp: number, data: any, from: string);
    computeHash(privateKey: string): void;
    verifyHash(address: string, signature: string): any;
}
