import { ProductEntity } from "../../domain/product.entity";
import { ProductRaw } from "../types/database.types";

export const createEntityFromProductRaw = (raw: ProductRaw): ProductEntity => ({
    reference: raw.reference,
    name: raw.name,
    sellerId: raw.sellerId,
    price: raw.price.toString(),
    kind: raw.kind,
    stock: raw.stock.toString(),
    weight: raw.weight ?? undefined,
    dimensions: !!raw.height && !!raw.width && !! raw.length ? {
        height: raw.height,
        width: raw.width,
        length: raw.length
    } : undefined
})

export const createProductRawFromEntity = (entity: ProductEntity): ProductRaw => ({
    reference: entity.reference,
    name: entity.name,
    sellerId: entity.sellerId,
    price: Number(entity.price),
    kind: entity.kind,
    stock: Number(entity.stock),
    weight: entity.weight ?? undefined,
    height: entity.dimensions?.height,
    width: entity.dimensions?.width,
    length: entity.dimensions?.length
})