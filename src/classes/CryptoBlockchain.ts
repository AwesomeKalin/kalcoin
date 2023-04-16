import fs from "fs";
import { CryptoBlock } from "./CryptoBlock.js";

export class CryptoBlockchain {
    blockchain: Array<CryptoBlock>;
    difficulty: number = 6;

    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }

    startGenesisBlock(){
        return new CryptoBlock(0, 1681232132, "Not the final genesis block", "0");
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock: CryptoBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i-1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            if (currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
        }
        return true;
    }

    async writeToDisk() {
        fs.writeFileSync('./blockchain.kal', JSON.stringify(this.blockchain));
        console.log('Saved blockchain to disk');
    }
}