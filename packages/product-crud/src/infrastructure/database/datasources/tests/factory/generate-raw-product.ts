import { Kinds } from "../../../../../contexts/product";
import { ProductRaw } from "../../../../../contexts/product/infrastructure/types/database.types";
import { DeepPartial } from "../../../tests/deep-partial.type";

export const generateRawProduct = (partialProduct: DeepPartial<ProductRaw> = {}): ProductRaw => {
    const raw : ProductRaw = {
        reference: "48374",
          name: "TIE FIGHTER",
          sellerId: "amazon",
          price: 80,
          kind: Kinds.starwars,
          stock: 5,
    }
    return {
        ...raw,
        ...partialProduct
    }
}