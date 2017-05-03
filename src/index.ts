import * as log from "winston"

export async function main() {



    let close = () => {
      log.info(`Shutting down...`);
    };

    process.on("SIGINT", close);
    process.on("SIGTERM", close);

    //

}

if (require.main === module) {
    main().catch((e) => {
        log.error(`Error encountered`, e);
        process.exit(1)
    })
}
