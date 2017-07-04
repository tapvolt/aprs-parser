import * as log from "winston"
import Message from "./message";
import Callsign from "./callsign";

export default class APRS {

    constructor() {
    }

    public parse(rawPacket: string) {
        const message = new Message();
        message.setRaw(rawPacket);

        let delimiter = rawPacket.indexOf(":");
        if (delimiter < 0) {
            log.error("[PARSE] no ':' delimiter found in raw packet", {raw: rawPacket});
            throw new Error;
        }

        let rawHeader = rawPacket.substr(0, delimiter),
            rawBody = rawPacket.substr(delimiter + 1);

        let [from, to, digiArray] = this.parseHeader(rawHeader);
        message.setHeader(from, to, digiArray)


    }

    /**
     *
     * @param raw
     * @returns {[Callsign,Callsign,any[]]}
     */
    protected parseHeader(raw: string) : [Callsign, Callsign, any] {
        let delimiter = raw.indexOf(">");
        if (delimiter < 0) {
            log.error("[PARSE] no '>' delimiter found in raw header", {raw: raw});
            throw new Error;
        }

        let from = raw.substr(0, delimiter),
            toAndDigi = raw.substr(delimiter + 1);

        let to = "",
            digiArray: string[] = [];

        delimiter = toAndDigi.indexOf(",");

        if (delimiter < 0) {
            to = toAndDigi
        } else {
            to = toAndDigi.substr(0, delimiter);
            digiArray = toAndDigi.substr(delimiter + 1).split(",");
        }

        return [new Callsign(from), new Callsign(to), digiArray.map((digi) => {return new Callsign(digi)})]
    }

}
