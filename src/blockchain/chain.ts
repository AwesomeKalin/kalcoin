import { blockIndexNo } from "../daemon/db.js";
import { Block } from "./block.js";

export class Chain {
    chain: Array<Block|undefined>;

    constructor() {
        const genesis: Block | undefined = blockIndexNo.get(0);
        if (typeof genesis === 'undefined') {
            console.error('Genesis is invalid. Code may be corrupt or modified!');
            process.exit(2);
        }
        this.chain = [genesis];
    }
}