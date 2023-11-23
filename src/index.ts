import { WebSocket } from "ws";
import { Block } from "./block";
import { p2p } from "./p2p";

export function getBlockchain(): Block[] {
    return blockchain;
}

export function addToChain(newBlock: Block) {
    blockchain.push(newBlock);
}

export function getP2p(): p2p {
    return p2pWs;
}

export function connectToPeer(peer: string) {
    p2pWs.connectToPeer(peer);
}

const genesisBlock: Block = new Block(0, null, Date.now() / 1000, 'Hello world! Kalhash is crap!');
let blockchain: Block[] = [genesisBlock];
let p2pWs: p2p = new p2p();