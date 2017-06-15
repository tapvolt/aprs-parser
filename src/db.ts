import { mysqlConfig } from "./types";
import * as mysql from "mysql2/promise"

export default class DbHandler {

    db: mysql.createConnection;

    constructor(
        protected config: mysqlConfig) {
    }

    public async connect() {
        this.db = await mysql.createConnection({
            host: this.config.host,
            user: this.config.username,
            database: this.config.database
        })
    }

    public async execute(msg) {
        this.db.execute("INSERT INTO `packet` (`raw`) VALUES (?)", [msg.toString()]);
    }

    public close() {
        this.db.end();
    }

}

