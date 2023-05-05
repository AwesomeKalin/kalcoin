import bitcore from 'bitcore-lib';
//@ts-expect-error
import { kalhash } from 'kalhash.js';
import { CryptoOutput } from './CryptoOutput.js';
import { CryptoInput } from './CryptoInput.js';

export class CryptoTransaction {
    timestamp: number;
    data: any;
    hash: string = '';
    signedHash: string = '';
    inputs: Array<CryptoInput>;
    outputs: Array<CryptoOutput>;

    constructor(timestamp: number, privateKeyList: Array<string>, inputs: Array<CryptoOutput>, data?: any, outputs?: Array<CryptoOutput>) {
        this.timestamp = timestamp;
        this.data = data;
        if (outputs == undefined) {
            this.outputs = [];
        } else {
            this.outputs = outputs;
        }if (inputs == undefined) {
            this.inputs = [];
        } else {
            let inp: Array<CryptoInput> = [];
            for (var i = 0; i < inputs.length; i++) {
                inp.push(new CryptoInput(inputs[i], privateKeyList[i], outputs || []));
            }
            this.inputs = inp;
        }
    }

    computeHash(privateKey: string) {
        const address = new bitcore.PrivateKey(privateKey);
        this.hash = kalhash(this.inputs + this.timestamp.toString() + this.data + this.outputs);
        this.signedHash = new bitcore.Message(this.hash).sign(address);
    }

    verifyHash(address: string, signature: string) {
        const addr: any = new bitcore.Address(address, bitcore.Networks.add({
            name: 'kalcoin',
            pubkeyhash: 0x2D,
            privateKey: 0x1C,
            scriptHash: 0x28,
            port: 50576
        }));
        if (kalhash(this.inputs + this.timestamp.toString() + this.data + this.outputs) === this.hash) {
            return new bitcore.Message(this.hash).verify(addr, signature);
        } else return false;
    }
}