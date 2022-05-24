import { Server as HapiServer, ServerRoute } from '@hapi/hapi'
import { Config } from './config'
import RelationalDatabase from './infrastructure/database/database'
import { getRoutes } from './routes'

export class Server {
    public hapiServer: HapiServer

    constructor(config: Config) {
        this.hapiServer = new HapiServer({
            host: config.api.server.host,
            port: config.api.server.port
        })
    }

    private route(route: ServerRoute | ServerRoute[]) {
        this.hapiServer.route(route)
    }

    async init(database: RelationalDatabase): Promise<void> {
        this.route(getRoutes(database))
    }

    async start(): Promise<void> {
        await this.hapiServer.start()
        console.log('Server running on %s', this.hapiServer.info.uri)
    }
}