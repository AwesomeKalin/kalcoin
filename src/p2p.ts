import { WebSocket } from "ws";
import { JSONToObject } from "./util/jsonToObject";
import { Block } from "./block";
import { getBlockchain } from ".";

export class p2p {
    public sockets: WebSocket[] = [];

    constructor() {

    }

    initMessageHandler(ws: WebSocket) {
        ws.on('message', (data: string) => {
            const message: Message | null = JSONToObject<Message>(data);
            if (message === null) {
                console.log('could not parse received JSON message: ' + data);
                return;
            }
            console.log('Received message' + JSON.stringify(message));
            switch (message.type) {
                case MessageType.QUERY_LATEST:
                    this.write(ws, this.respondLatestMessage());
                    break;
                case MessageType.QUERY_ALL:
                    this.write(ws, this.responseChainMsg());
                    break;
                case MessageType.RESPONSE_BLOCKCHAIN:
                    const receivedBlocks: Block[] | null = JSONToObject<Block[]>(message.data);
                    if (receivedBlocks === null) {
                        console.log('invalid blocks received:');
                        console.log(message.data)
                        break;
                    }
                    this.handleBlockchainResponse(receivedBlocks);
                    break;
            }
        });
    }

    initConnection(ws: WebSocket) {
        this.sockets.push(ws);
        this.initMessageHandler(ws);
        this.initErrorHandler(ws);
        this.write(ws, queryChainLengthMsg());
    }

    public connectToPeer(peer: string) {
        const connection: WebSocket = new WebSocket(peer);

        connection.on('open', () => {
            this.initConnection(connection);
        });

        connection.on('error', () => {
            console.log('Connection error');
        });
    }

    write(ws: WebSocket, message: Message) {
        ws.send(JSON.stringify(message));
    }

    respondLatestMessage(): Message {
        return {
            type: MessageType.RESPONSE_BLOCKCHAIN,
            data: JSON.stringify([getBlockchain()[getBlockchain().length - 1]]),
        }
    }

    responseChainMsg(): Message {
        return {
            type: MessageType.RESPONSE_BLOCKCHAIN,
            data: JSON.stringify(getBlockchain()),
        }
    }

    handleBlockchainResponse(receivedBlocks: Block[]) {
        if (receivedBlocks.length === 0) {
            console.log('Recieved block chain size of 0');
            return;
        }

        const latestBlockReceived: Block = receivedBlocks[receivedBlocks.length - 1];

        if (!isValidBlockStructure(latestBlockReceived)) {
            console.log('block structuture not valid');
            return;
        }

        const latestBlockHeld: Block = getLatestBlock();

        if (latestBlockReceived.index > latestBlockHeld.index) {
            console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);

            if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
                if (addBlockToChain(latestBlockReceived)) {
                    broadcast(responseLatestMsg());
                }
            } else if (receivedBlocks.length === 1) {
                console.log('We have to query the chain from our peer');
                broadcast(queryAllMsg());
            } else {
                console.log('Received blockchain is longer than current blockchain');
                replaceChain(receivedBlocks);
            }
        } else {
            console.log('Received blockchain is not longer than received blockchain. Do nothing');
        }
    }
}

class Message {
    //@ts-ignore
    public type: MessageType;
    public data: any;
}

enum MessageType {
    QUERY_LATEST = 0,
    QUERY_ALL = 1,
    RESPONSE_BLOCKCHAIN = 2,
}