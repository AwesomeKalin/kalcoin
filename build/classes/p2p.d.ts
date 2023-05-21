import { Libp2p } from "libp2p";
export declare class p2p {
    node: Libp2p | Promise<Libp2p>;
    constructor();
    init(): Promise<void>;
}
