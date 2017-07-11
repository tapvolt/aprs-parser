import Callsign from "./callsign"

export default class Message {

    private raw: string
    private from: Callsign
    private to: Callsign
    private via: any

    public setRaw(raw: string) {
        this.raw = raw
    }

    public setHeader(from: Callsign, to: Callsign, digiArray: Callsign[]) {
        this.from = from
        this.to = to
        this.via = digiArray
    }

}
