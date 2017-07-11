import * as dgram from "dgram"
import * as log from "winston"
import APRS from "./aprs"
import DbHandler from "./db"

export default class ServerHandler {

    protected server: dgram.Socket

    constructor(
        protected udp: number,
        protected db: DbHandler) {
        this.server = dgram.createSocket("udp4")
        this.setup()
    }

    public bind() {
        log.info("[Server] Bind", {port: this.udp})
        this.server.bind(this.udp)
    }

    public close() {
        this.server.close()
    }

    protected setup() {
        this.server.on("listening", () => {
            const add = this.server.address()
            log.info("[Server] Listening", {address: add.address, port: add.port})
        })

        this.server.on("message", (msg, rinfo) => {
            log.info("[Server] Message received", {message: msg.toString(), rinfo})
            this.db.execute(msg)
            const aprs = new APRS()
            aprs.parse(msg.toString())
        })

        this.server.on("error", (err) => {
            log.error("[Server] Error", {err})
            this.server.close()
        })

        this.server.on("close", () => {
            log.info("[Server] Close")
        })
    }
}
