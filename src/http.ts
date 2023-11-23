import express, { Express } from 'express';
import { addToChain, getBlockchain, getP2p } from '.';
import { Block } from './block';
import { generateNewBlock } from './generateNewBlock';

export function httpServer(port: number) {
    const app: Express = express();
    app.use(express.json());

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });

    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNewBlock(req.body.data, getBlockchain()[getBlockchain().length - 1]);
        addToChain(newBlock);
        res.send(newBlock);
    });

    app.get('/peers', (req, res) => {
        res.send(getP2p().sockets.map(( s: any ) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
}