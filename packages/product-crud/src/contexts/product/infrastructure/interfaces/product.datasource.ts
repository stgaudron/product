import { SearchParams } from "../../Use-cases/search-product/search-product.use-case";
import { ProductRaw } from "../types/database.types";

export interface ProductDatasource {
    createProduct(product: ProductRaw): Promise<ProductRaw>
    getProduct(reference: string): Promise<ProductRaw | null>
    updateProduct(reference: string, product: ProductRaw): Promise<ProductRaw>,
    deleteProduct(reference: string): Promise<void>
    searchProduct(searchParams: SearchParams): Promise<ProductRaw[]>
}