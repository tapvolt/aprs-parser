import * as log from "winston"
import * as dgram from "dgram";
import DbHandler from "./db";
import APRS from "./aprs";

export default class ServerHandler {

    protected server: dgram.Socket;

    constructor(
        protected udp: number,
        protected db: DbHandler) {
        this.server = dgram.createSocket("udp4");
        this.init()
    }

    protected init() {
        this.server.on("listening", () => {
            let add = this.server.address();
            log.info("[Server] Listening", {address: add.address, port: add.port})
        });

        this.server.on("message", (msg, rinfo) => {
            log.info("[Server] Message received", {message: msg.toString(), rinfo: rinfo});
            this.db.execute(msg);
            const aprs = new APRS();
            aprs.parse(msg.toString());
        });

        this.server.on("error", (err) => {
            log.error("[Server] Error", {error: err});
            this.server.close()
        });

        this.server.on("close", () => {
            log.info("[Server] Close");
        })
    }

    public bind() {
        log.info("[Server] Bind", {port: this.udp});
        this.server.bind(this.udp)
    }

    public close() {
        this.server.close();
    }
}

