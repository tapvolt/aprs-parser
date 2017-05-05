import * as log from "winston"
const dgram = require("dgram")

export namespace Utils {

    export default class Server {

        constructor() {
            let server = dgram.createSocket("udp4");
        }


    }

}
