import { CryptoBlock } from "./CryptoBlock.js";
export declare class CryptoBlockchain {
    blockchain: Array<CryptoBlock>;
    difficulty: number;
    constructor();
    startGenesisBlock(): CryptoBlock;
    obtainLatestBlock(): CryptoBlock;
    addNewBlock(newBlock: CryptoBlock): void;
    checkChainValidity(): boolean;
}
