import { ProductEntity } from ".."
import { SearchParams } from "../../Use-cases/search-product"

export interface ProductRepository {
    createProduct(productEntity: ProductEntity): Promise<ProductEntity>
    isExistingProduct(reference: string): Promise<boolean>
    getProduct(reference: string): Promise<ProductEntity | null>
    updateProduct(reference: string, productEntity: ProductEntity): Promise<ProductEntity>
    deleteProduct(reference: string): Promise<void>
    searchProduct(searchParams: SearchParams): Promise<ProductEntity[]>
}