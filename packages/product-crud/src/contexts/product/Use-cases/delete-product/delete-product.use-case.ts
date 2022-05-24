import { ProductRepository } from "../../domain/interface";


export type DeleteProductUseCase = (
    reference: string
  ) => Promise<void>;

export const deleteProductUseCase = (repo: ProductRepository): DeleteProductUseCase => {
    return async (reference: string) => {
        return repo.deleteProduct(reference)
    }
}