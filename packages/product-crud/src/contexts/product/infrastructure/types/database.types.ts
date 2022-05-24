import { KindsValues } from "../../../common-product/types/product-kind.type"

export type ProductRaw = {
    reference: string
    name: string
    sellerId: string
    price: number
    kind: KindsRaw
    stock: number
    weight?: string
    height?: string
    width?: string
    length?: string
    isDeleted?: boolean
}

export type KindsRaw = KindsValues