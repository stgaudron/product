import { ProductRepository } from "../domain/interface";
import { ProductEntity } from "../domain/product.entity";
import { SearchParams } from "../Use-cases/search-product/search-product.use-case";
import { ProductDatasource as ProductDatasource } from "./interfaces/product.datasource";
import {
  createEntityFromProductRaw,
  createProductRawFromEntity,
} from "./mappers/product.mapper";

export class ProductServiceRepository implements ProductRepository {
  constructor(private readonly datasource: ProductDatasource) {}

  async createProduct(productEntity: ProductEntity): Promise<ProductEntity> {
    const createdProduct = await this.datasource.createProduct(
      createProductRawFromEntity(productEntity)
    );
    return createEntityFromProductRaw(createdProduct);
  }

  async isExistingProduct(reference: string): Promise<boolean> {
     const product = await this.datasource.getProduct(reference)
     return !!product
  }

  async getProduct(reference: string): Promise<ProductEntity | null> {
    const productRaw = await this.datasource.getProduct(reference)
    return productRaw ? createEntityFromProductRaw(productRaw) : null
  }

  //tu peux simplifier en supprimant reference dans les arguments
  async updateProduct(reference: string, productEntity: ProductEntity): Promise<ProductEntity> {
    const updatedProduct = await this.datasource.updateProduct(reference, createProductRawFromEntity(productEntity))
    return updatedProduct ? createEntityFromProductRaw(updatedProduct): productEntity
  }

  async deleteProduct(reference: string): Promise<void> {
    await this.datasource.deleteProduct(reference)
  }

  async searchProduct(searchParams: SearchParams): Promise<ProductEntity[]> {
    const foundProductsRaw = await this.datasource.searchProduct(searchParams)
    return foundProductsRaw ? foundProductsRaw.map(productRaw => createEntityFromProductRaw(productRaw)) : []
  }
}
