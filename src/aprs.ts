import * as log from "winston"
import Callsign from "./callsign"
import Message from "./message"

export default class APRS {

    public parse(rawPacket: string) {
        const message = new Message()
        message.setRaw(rawPacket)

        const delimiter = rawPacket.indexOf(":")
        if (delimiter < 0) {
            log.error("[PARSE] no ':' delimiter found in raw packet", {rawPacket})
            throw new Error()
        }

        const rawHeader = rawPacket.substr(0, delimiter),
            rawBody = rawPacket.substr(delimiter + 1)

        const [from, to, digiArray] = this.parseHeader(rawHeader)
        message.setHeader(from, to, digiArray)
    }

    /**
     *
     * @param raw
     * @returns {[Callsign,Callsign,any[]]}
     */
    protected parseHeader(raw: string): [Callsign, Callsign, any] {
        let delimiter = raw.indexOf(">")
        if (delimiter < 0) {
            log.error("[PARSE] no '>' delimiter found in raw header", {raw})
            throw new Error()
        }

        const from = raw.substr(0, delimiter),
            toAndDigi = raw.substr(delimiter + 1)

        let to = "",
            digiArray: string[] = []

        delimiter = toAndDigi.indexOf(",")

        if (delimiter < 0) {
            to = toAndDigi
        } else {
            to = toAndDigi.substr(0, delimiter)
            digiArray = toAndDigi.substr(delimiter + 1).split(",")
        }

        return [new Callsign(from), new Callsign(to), digiArray.map((digi) => new Callsign(digi))]
    }

}
