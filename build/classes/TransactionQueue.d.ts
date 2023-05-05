import { CryptoTransaction } from "./CryptoTransaction.js";
export declare class TransactionQueue {
    queue: Array<CryptoTransaction>;
    constructor();
    add(transaction: CryptoTransaction): void;
    garbageCollect(): void;
    sortByTxFee(): void;
    calculateTxFee(tx: CryptoTransaction): number;
}
