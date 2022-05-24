import { ServerRoute } from "@hapi/hapi";
import { productInjector } from "./contexts/product/infrastructure/product.injector";
import RelationalDatabase from "./infrastructure/database/database";

export const getRoutes: GetRoutes = (database: RelationalDatabase) => {
    return [
        ...productInjector(database)
    ]
}

export type GetRoutes = (database: RelationalDatabase) => ServerRoute[]