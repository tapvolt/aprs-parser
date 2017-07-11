import * as ip from "ip"
import * as log from "winston"

// tslint:disable-next-line
export namespace Utils {

    export function logger() {
        log.remove(log.transports.Console)
        log.add(log.transports.Console, {
            formatter: (options) => {
                return options.timestamp() + " " + options.level.toUpperCase() + " "
                    + (options.message ? options.message : "") +
                    (options.meta && Object.keys(options.meta).length ? " " + JSON.stringify(options.meta) : "")
            },
            timestamp: () => {
                return new Date().toISOString()
            },
        })

        log.add(log.transports.File, {
            filename: "error.log",
            formatter: (options) => {
                return options.timestamp() + " " + options.level.toUpperCase() + " "
                    + (options.message ? options.message : "") +
                    (options.meta && Object.keys(options.meta).length ? " " + JSON.stringify(options.meta) : "")
            },
            handleExceptions: true,
            json: false,
            level: "error",
            timestamp: () => {
                return new Date().toISOString()
            },
        })
    }

    /**
     * Working from / adjust for router config
     * @returns {boolean}
     */
    export function isWifi() {
        return ip.address() === "192.168.1.10"
    }
}
