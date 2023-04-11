//@ts-expect-error
import { kalhash } from 'kalhash.js';
class CryptoBlock {
    index;
    timestamp;
    data;
    precedingHash;
    hash;
    nonce = 0;
    constructor(index, timestamp, data, precedingHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        return kalhash(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }
    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}
class CryptoBlockchain {
    blockchain;
    difficulty = 6;
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    startGenesisBlock() {
        return new CryptoBlock(0, 1681232132, "Not the final genesis block", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
let kalcoin = new CryptoBlockchain();
kalcoin.addNewBlock(new CryptoBlock(1, 1681232190, { sender: "Kalin", recipient: "Kamen", quantity: 50 }));
console.log('Block 1 mined');
kalcoin.addNewBlock(new CryptoBlock(2, 1681232190, { sender: "Kamen", recipient: "Muffin", quantity: 25 }));
console.log('Block 2 mined');
kalcoin.checkChainValidity();
console.log(JSON.stringify(kalcoin, null, 4));
