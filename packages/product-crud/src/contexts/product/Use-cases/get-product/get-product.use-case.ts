import { ProductEntity } from "../../domain/product.entity";
import { ProductServiceRepository } from "../../infrastructure/product-service.repository";

export type GetProductUseCase = (reference: string) => Promise<ProductEntity | null>

export const getProductUseCase = (repo: ProductServiceRepository): GetProductUseCase => {
    return async(reference: string) => {
        return repo.getProduct(reference)
    }
}