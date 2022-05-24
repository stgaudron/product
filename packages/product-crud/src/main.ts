import { Server } from "./server";
import { Config } from "./config";
import RelationalDatabase from "./infrastructure/database/database";

const config = new Config()
;(async () => {
    process.on('unhandledRejection', err => {
        console.log(err)
        process.exit(1)
    })
    const server:Server = new Server(config)
    const database = new RelationalDatabase(config)
    await server.init(database)
    await server.start()
})()