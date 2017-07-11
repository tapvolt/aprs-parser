import * as mysql from "mysql2/promise"
import { IMysqlConfig } from "./types"

export default class DbHandler {

    private db: mysql.createConnection

    constructor(
        protected config: IMysqlConfig) {
    }

    public async connect() {
        this.db = await mysql.createConnection({
            database: this.config.database,
            host: this.config.host,
            password: this.config.password,
            user: this.config.username,
        })
    }

    public async execute(msg) {
        this.db.execute("INSERT INTO `packet` (`raw`) VALUES (?)", [msg.toString()])
    }

    public close() {
        this.db.end()
    }

}
