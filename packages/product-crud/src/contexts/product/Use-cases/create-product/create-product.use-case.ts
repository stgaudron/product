import { haveError } from "../../../../utils";
import { ProductDomainException, ProductDomainExceptionBuilder } from "../../domain/exceptions";
import { ProductRepository } from "../../domain/interface";
import { ProductEntity } from "../../domain";
import { validateProductEntries } from "../../domain";

export type CreateProductUseCase = (
  payload: ProductEntity
) => Promise<ProductEntity | ProductDomainException>;

export const createProductUseCase =
  (repository: ProductRepository): CreateProductUseCase =>
  async (payload) => {
    let errors = validateProductEntries(payload);
    if (haveError(errors)) return ProductDomainExceptionBuilder.build(errors);

    if (await repository.isExistingProduct(payload.reference)) return new ProductDomainException("Product already exists")

    return repository.createProduct(payload);
  };

