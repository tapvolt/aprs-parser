import Callsign from "./callsign";

export default class Message {

    raw: string
    from: Callsign
    to: Callsign
    via: any

    constructor() {
    }

    public setRaw(raw: string) {
        this.raw = raw
    }

    public setHeader(from: Callsign, to: Callsign, digiArray: Array<Callsign>) {
        this.from = from;
        this.to = to;
        this.via = digiArray;
    }

}
