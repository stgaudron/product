import { ProductDatasource } from "../../../contexts/product/infrastructure/interfaces/product.datasource";
import { ProductRaw } from "../../../contexts/product/infrastructure/types/database.types";
import { SearchParams } from "../../../contexts/product/Use-cases/search-product/search-product.use-case";
import RelationalDatabase from "../database";

export class PrismaProductDatasource implements ProductDatasource {
  constructor(private readonly database: RelationalDatabase) {}

  async createProduct(product: ProductRaw): Promise<ProductRaw> {
    await this.database.client.product.create({
      data: product,
    });
    return product;
  }

  async getProduct(reference: string): Promise<ProductRaw | null> {
      return this.database.client.product.findFirst({
          where: {
              reference: reference,
              isDeleted: false
          } 
      }) as Promise<ProductRaw | null>
  }

  async updateProduct(reference: string, product: ProductRaw): Promise<ProductRaw> {
      await this.database.client.product.update({
          where: {reference: reference},
          data: product,
      }) 
      return product
  }

  async deleteProduct(reference: string): Promise<void> {
      await this.database.client.product.update({
          where: {reference: reference},
          data: { isDeleted: true}
      })
  }

  async searchProduct(searchParams: SearchParams): Promise<ProductRaw[]> {
      return this.database.client.product.findMany({
          where: {
              AND: [
            {sellerId: searchParams.sellerId},
            {price: { gt : searchParams.priceRange?.minPrice, lt: searchParams.priceRange?.maxPrice }},
            {stock: { gt : searchParams.minimalStock }},
            {kind: { in: searchParams.kinds}}
              ]
        }
      }) as Promise<ProductRaw[]>
  }
}
