import { noise } from "@chainsafe/libp2p-noise";
import { tcp } from "@libp2p/tcp";
import { createLibp2p } from "libp2p";
import { mplex } from '@libp2p/mplex';
import { kadDHT } from '@libp2p/kad-dht';
import { webSockets } from '@libp2p/websockets';
import { webTransport } from '@libp2p/webtransport';
import { webRTC } from '@libp2p/webrtc';
export class p2p {
    node;
    constructor() {
        this.node = createLibp2p({
            transports: [tcp(), webSockets(), webTransport(), webRTC()],
            connectionEncryption: [noise()],
            streamMuxers: [mplex()],
            dht: [kadDHT()],
        });
    }
    async init() {
        while (this.node instanceof (Promise)) { }
        await this.node.start();
        console.log(this.node.peerId);
        //@ts-expect-error
        this.node.handle('/kalcoin', ({ connection, stream, protocol }) => {
            console.log(protocol);
        });
    }
}
