import { Product } from "@prisma/client";
import {ProductRaw, KindsRaw} from "../../../../../contexts/product/infrastructure/types/database.types";

export const convertPrismaProductToProductRaw = (
  product: Product | null
): ProductRaw | undefined => {
  if (!!product)
    return JSON.parse(
      JSON.stringify({
        reference: product.reference,
        name: product.name,
        sellerId: product.sellerId,
        price: product.price,
        kind: product.kind as KindsRaw,
        stock: product.stock,
        weight: product.weight || undefined,
        height: product.height || undefined,
        width: product.width || undefined,
        length: product.length || undefined,
      })
    );
};