export interface IAppConfig {
    name: string
    version: number
}

export interface ITelnetConfig {
    host: string
    port: number
    username: string
    password: string
}

export interface IAPRSConfig {
    udp: number
    filter: string[]
}

export interface IMysqlConfig {
    host: string
    username: string
    password: string | null
    database: string
}

export interface IAPRSMessage {
    raw: string
}
