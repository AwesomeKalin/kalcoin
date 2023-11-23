import { Block } from "./block";
export declare function generateNewBlock(blockData: string, previousBlock: Block): Block;
export declare function isValidNewBlock(newBlock: Block, previousBlock: Block): boolean;
export declare function isValidBlockStructure(block: Block): boolean;
export declare function isChainValid(chain: Block[], genesis: Block): boolean;
export declare function replaceChain(chain: Block[], newChain: Block[]): Block[];
