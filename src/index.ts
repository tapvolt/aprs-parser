import * as config from "config"
import * as assert from "assert"
import * as log from "winston"
const dgram = require("dgram")

export async function main() {

    // Verify
    [
        "APRSServer.udp"
    ].forEach((key: string) => {
        assert(config.has(key), "Missing key in config")
    });

    const aprs = config.get<any>("APRSServer");


    // Log


    // Server
    const server = dgram.createSocket("udp4");

    server.on("listening", () => {
        let add = server.address();
        log.info(`[Server] listening`, {address: add.address, port: add.port})
    });

    server.on("message", (msg, rinfo) => {
        log.info(`[Server] Message received`, {message: msg.toString(), rinfo: rinfo})
    })

    server.on("error", (e) => {
        log.error(`[Server] Error`, {error: e});
        server.close()
    })

    server.on("close", () => {
        log.error(`[Server] Close`);
    })

    server.bind(aprs.udp);


    // Shutdown
    const close = () => {
      log.info(`Shutting down...`);
      server.close()
    };
    process.on("SIGINT", close);
    process.on("SIGTERM", close);

}

if (require.main === module) {
    main().catch((e) => {
        log.error(`Error encountered`, e);
        process.exit(1)
    })
}
