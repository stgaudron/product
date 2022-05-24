import { ServerRoute } from "@hapi/hapi";
import RelationalDatabase from "../../../infrastructure/database/database";
import { PrismaProductDatasource } from "../../../infrastructure/database/datasources/prisma-product.datasource";
import { createProductUseCase } from "../Use-cases/create-product";
import { deleteProductUseCase } from "../Use-cases/delete-product";
import { getProductUseCase } from "../Use-cases/get-product";
import { searchProductUseCase } from "../Use-cases/search-product";
import { updateProductUseCase } from "../Use-cases/update-product";

import { ProductServiceRepository } from "./product-service.repository";
import { RestProductController } from "./product.controller";
import { productRoutes } from "./product.routes";

export const productInjector = (
  datasourceClient: RelationalDatabase
): ServerRoute[] => {
  const datasource = new PrismaProductDatasource(datasourceClient);
  const repository = new ProductServiceRepository(datasource);
  const controller = new RestProductController(
    createProductUseCase(repository),
    getProductUseCase(repository),
    updateProductUseCase(repository),
    deleteProductUseCase(repository),
    searchProductUseCase(repository)
  );
  return productRoutes(controller);
};
