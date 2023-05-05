import { noise } from "@chainsafe/libp2p-noise";
import { tcp } from "@libp2p/tcp";
import { Libp2p, createLibp2p } from "libp2p";
import { mplex } from '@libp2p/mplex';
import { kadDHT } from '@libp2p/kad-dht'

export class p2p {
    //@ts-expect-error
    node: Libp2p;

    constructor() {
        var node: any = createLibp2p({
            transports: [tcp()],
            connectionEncryption: [noise()],
            streamMuxers: [mplex()],
            dht: [kadDHT()],
        }).then(async () => {
            this.node = node;
            await node.start();
            console.log('Libp2p started');
            console.log('Listening on:');
            node.getMultiaddrs().forEach((addr: any) => {
                console.log(addr.toString());
            });
        });
        node.contentRouting.provide('1');
    }
}