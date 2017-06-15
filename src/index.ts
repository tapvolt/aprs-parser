import * as assert from "assert"
import * as types from "./types"
import * as config from "config"
import * as log from "winston"
import { Utils } from "./utils"
import TelnetHandler from "./telnet"
import DbHandler from "./db"
import ServerHandler from "./server";

export async function main() {

    // Verify
    [
        "app.name",
        "app.version",

        "telnet.host",
        "telnet.port",
        "telnet.username",
        "telnet.password",

        "APRSServer.udp",
        "APRSServer.filter",

        "mysql.host",
        "mysql.username",
        "mysql.password",
        "mysql.database",

    ].forEach((key: string) => {
        assert(config.has(key), "Missing key in config")
    });

    const appConfig = config.get<types.appConfig>("app"),
        telnetConfig = config.get<types.telnetConfig>("telnet"),
        APRSConfig = config.get<types.APRSConfig>("APRSServer"),
        mysqlConfig = config.get<types.mysqlConfig>("mysql");

    Utils.logger();

    const db = new DbHandler(mysqlConfig);
    await db.connect();

    const telnet = new TelnetHandler(appConfig, telnetConfig, APRSConfig.udp);
    await telnet.connect();

    const server = new ServerHandler(APRSConfig.udp, db);
    await server.bind();

    // Shutdown
    const close = () => {
        telnet.close();
        server.close();
        db.close();
    };
    process.on("SIGINT", close);
    process.on("SIGTERM", close);
}

if (require.main === module) {
    main().catch((err) => {
        log.error("Error encountered", {error: err});
        process.exit(1)
    })
}
