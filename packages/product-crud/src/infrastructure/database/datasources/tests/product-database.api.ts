import { raw } from "@prisma/client/runtime";
import { KindsRaw, ProductRaw } from "../../../../contexts/product/infrastructure/types/database.types";
import RelationalDatabase from "../../database";

export class ProductDatabaseApi {
    constructor(private readonly database: RelationalDatabase) {}

    createProduct(raw: ProductRaw) {
        return this.database.client.product.create({
            data: {
                reference: raw.reference,
                name: raw.name,
                sellerId: raw.sellerId,
                price: raw.price,
                kind: raw.kind as KindsRaw,
                stock: raw.stock,
                weight: raw.weight || undefined,
                height: raw.height || undefined,
                width: raw.width || undefined,
                length: raw.length || undefined,
                isDeleted: raw.isDeleted
            }
        })
    }

    async createProducts(raws: ProductRaw[]):Promise<ProductRaw[]> {
        for (const raw of raws) {
            await this.database.client.product.create({
                data: {
                    reference: raw.reference,
                    name: raw.name,
                    sellerId: raw.sellerId,
                    price: raw.price,
                    kind: raw.kind as KindsRaw,
                    stock: raw.stock,
                    weight: raw.weight || undefined,
                    height: raw.height || undefined,
                    width: raw.width || undefined,
                    length: raw.length || undefined,
                    isDeleted: raw.isDeleted
                }
            })
        }
        return raws
    }

    findDeletedProduct(reference: string) {
        return this.database.client.product.findMany({
            where: {
                reference: reference,
                isDeleted: true
            }
        })
    }
    
}