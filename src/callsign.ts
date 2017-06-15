import * as log from "winston"

export default class Callsign {

    callSign: string
    SSID: string

    constructor(
        protected rawCallsign: string) {

        let delimiter = rawCallsign.indexOf("-");

        if (delimiter == 0) {
            log.debug("[CALLSIGN] empty only SSID found");
            throw new Error;
        }
        if (delimiter < 0) {
            log.debug("[CALLSIGN] no '-' delimiter found in raw packet");
            delimiter = rawCallsign.length
        }
        if (delimiter > 0) {
            this.SSID = rawCallsign.substr(delimiter + 1)
            if (this.SSID.length == 0) {
                log.debug("[CALLSIGN] empty SSID");
            }
        }
        this.callSign = rawCallsign.substr(0, delimiter)
    }

    public fetch() {
        return this.callSign + (this.SSID ? "-" + this.SSID : "")
    }

}
