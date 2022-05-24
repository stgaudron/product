export interface Product {
    reference : string
    name : string
    sellerId : string
    price : string
    kind : Kinds
    weight? : string
    dimensions? : Dimension
    stock : string
}

export enum Kinds {
    city = 'city',
    marvel = 'marvel',
    starwars = 'starwars'
}

export interface Dimension {
    height: string
    width: string
    length: string
}
