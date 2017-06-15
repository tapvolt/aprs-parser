import { appConfig, telnetConfig } from "./types";
import * as log from "winston"
import { Socket } from "net";

export default class TelnetHandler {

    protected client: Socket;

    constructor(
        protected app: appConfig,
        protected telnet: telnetConfig,
        protected udp: number) {
        this.client = new Socket();
        this.init();
    }

    protected init() {
        this.client.on("close", () => {
            log.info("[Telnet] Close")
        });

        this.client.on("error", (err) => {
            log.error("[Telnet] Error", {error: err})
        });
    }

    protected connectionString() {
        return `user ${this.telnet.username} pass ${this.telnet.password} vers ${this.app.name} ${this.app.version} UDP ${this.udp}\r\0`
    }

    /**
     *
     * @returns {Promise<{}>}
     */
    public async connect(): Promise<{}> {
        return new Promise(resolve => {
            this.client.connect(this.telnet.port, this.telnet.host, () => {
                log.info("[Telnet] Connected", {hostname: this.telnet.host, port: this.telnet.port})
            });

            this.client.once("data", (data) => {
                log.info("[Telnet] Reception", {data: data.toString()});
                this.client.write(this.connectionString());
                resolve()
            });
        });
    }

    public close() {
        log.info("[Telnet] Destroy");
        this.client.destroy();
    }

}

