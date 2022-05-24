import { haveError } from "../../../../utils/error.utils";
import { ProductRepository } from "../../domain/interface";
import { ProductEntity } from "../../domain/product.entity";
import { validateProductEntries } from "../../domain/productentries.validate";
import { ProductDomainException, ProductDomainExceptionBuilder, ProductNotFoundDomainException } from "../../domain/exceptions";

export type UpdateProductUseCase = (
    reference: string,
    payload: ProductEntity
  ) => Promise<ProductEntity | ProductDomainException>;
  
  export const updateProductUseCase =
    (repository: ProductRepository): UpdateProductUseCase =>
    async (reference, payload) => {
      let errors = validateProductEntries(payload);
      if (haveError(errors)) return ProductDomainExceptionBuilder.build(errors);
        const existingProduct = await repository.isExistingProduct(reference)
      if (!existingProduct) {
          return new ProductNotFoundDomainException()
      } else {

          return await repository.updateProduct(reference, payload);
      }
    };