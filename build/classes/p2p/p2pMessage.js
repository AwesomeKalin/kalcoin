export class p2pMessage {
    type;
    data;
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
    static decode(info) {
        const decodedData = JSON.parse(info.toString());
        const { type, data } = decodedData;
        return new p2pMessage(type, data);
    }
}
