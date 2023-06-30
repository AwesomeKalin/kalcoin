import { Libp2p } from "libp2p";
import { CryptoBlockchain } from "../CryptoBlockchain.js";
import { p2pMessage } from "./p2pMessage.js";
export declare class p2p {
    node: Libp2p | Promise<Libp2p>;
    blockchain: CryptoBlockchain;
    constructor();
    init(): Promise<void>;
    sendData(data: p2pMessage): Promise<void>;
}
