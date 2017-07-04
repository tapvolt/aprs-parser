import * as ip from "ip"
import * as log from "winston"

export namespace Utils {

    export function logger() {
        log.remove(log.transports.Console);
        log.add(log.transports.Console, {
            timestamp: () => {
                return new Date().toISOString()
            },
            formatter: (options) => {
                return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? ' '+ JSON.stringify(options.meta) : '' );
            }
        })

        log.add(log.transports.File, {
            filename: "error.log",
            level: "error",
            json: false,
            handleExceptions: true,
            timestamp: () => {
                return new Date().toISOString()
            },
            formatter: (options) => {
                return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '' );
            }
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
