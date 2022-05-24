import { PrismaClient } from '@prisma/client'
import { Config } from '../../config'

export default class RelationalDatabase {
    client: PrismaClient

    constructor(config: Config) {
        this.client = new PrismaClient({
            datasources: {db: { url: config.datasource.url }}
        })
    }
}