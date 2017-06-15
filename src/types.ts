export interface appConfig {
    name: string
    version: number
}

export interface telnetConfig {
    host: string
    port: number
    username: string
    password: string
}

export interface APRSConfig {
    udp: number
    filter: Array<string>
}

export interface mysqlConfig {
    host: string
    username: string
    password: string | null
    database: string
}

export interface APRSMessage {
    raw: string
}
