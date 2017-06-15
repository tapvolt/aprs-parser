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
            timestamp: () => {
                return new Date().toISOString()
            },
            formatter: (options) => {
                return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '' );
            }
        })
    }
}
