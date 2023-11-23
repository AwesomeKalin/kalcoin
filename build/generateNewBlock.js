import { Block } from "./block";
export function generateNewBlock(blockData, previousBlock) {
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = Date.now() / 1000;
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData);
}
export function isValidNewBlock(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('Invalid Index!');
        return false;
    }
    else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('Invalid Previous Block!');
        return false;
    }
    else if (newBlock.calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data) !== newBlock.hash) {
        console.log('Invalid hash!');
        return false;
    }
    return true;
}
export function isValidBlockStructure(block) {
    return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string';
}
export function isChainValid(chain, genesis) {
    if (chain[0] !== genesis) {
        console.log('Genesis Block is not first block in chain!');
        return false;
    }
    for (var i = 0; i < chain.length; i++) {
        if (chain[i].index !== i) {
            console.log(`Block ${i} in the wrong position!`);
            return false;
        }
    }
    return true;
}
export function replaceChain(chain, newChain) {
    if (chain.length < newChain.length) {
        return newChain;
    }
    return chain;
}
