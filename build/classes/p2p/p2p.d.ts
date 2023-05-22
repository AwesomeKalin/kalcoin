import { Libp2p } from "libp2p";
import { CryptoBlockchain } from "../CryptoBlockchain.js";
export declare class p2p {
    node: Libp2p | Promise<Libp2p>;
    blockchain: CryptoBlockchain;
    constructor();
    init(): Promise<void>;
}
