import * as assert from "assert"
import * as config from "config"
import * as log from "winston"
import DbHandler from "./db"
import ServerHandler from "./server"
import TelnetHandler from "./telnet"
import * as types from "./types"
import { Utils } from "./utils"

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
    })

    const appConfig = config.get<types.appConfig>("app"),
        telnetConfig = config.get<types.telnetConfig>("telnet"),
        APRSConfig = config.get<types.APRSConfig>("APRSServer"),
        mysqlConfig = config.get<types.mysqlConfig>("mysql"),
        offset = Utils.isWifi() ? 1 : 0

    Utils.logger()

    const db = new DbHandler(mysqlConfig)
    await db.connect()

    const telnet = new TelnetHandler(appConfig, telnetConfig, APRSConfig.udp + offset)
    await telnet.connect()

    const server = new ServerHandler(APRSConfig.udp + offset, db)
    await server.bind()

    // Shutdown
    const close = () => {
        telnet.close()
        server.close()
        db.close()
    }

    process.on("SIGINT", close)
    process.on("SIGTERM", close)
}

if (require.main === module) {
    main().catch((err) => {
        log.error("Error encountered", {error: err})
        process.exit(1)
    })
}
