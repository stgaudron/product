import { Dimension, Kinds } from "../../product"

export interface ProductEntity {
    reference : string
    name : string
    sellerId : string
    price : string
    kind : Kinds
    weight? : string
    dimensions? : Dimension
    stock : string
}